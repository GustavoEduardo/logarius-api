import { IProdutosToAdd, IVenda, ProdutosToAdd } from "../../types/IVenda";
import BaseRepositories from "../respositories/BaseRepositories";
import { Connect } from "../respositories/Connection";
import ProdutoRepositories from "../respositories/ProdutoRepositories";
import VendaRepositories from "../respositories/VendaRepositories";
import { randomUUID } from "crypto";

class VendaService {
  async create(data: IVenda) {

    if (!data.produtos?.length){
      throw { message: "A venda precisa ter pelo menos um item!" };
    }

    data.valor_final = data.valor - (data.valor_desconto || 0);

    data.venda_id = randomUUID();

    data.status_pagamento = 'efetuado'; // Implementar integração cartão e pix.
    data.status = 'pendente'; // status até concluir atualização de estoques e relacionamento com produtos.

    data.endereco_entrega = data.endereco_entrega || null;

    const produtos: IProdutosToAdd[] = data.produtos;

    delete data.produtos;

    await VendaRepositories.insert({
      data,
    });

    // preenche tabela de relaionamento venda_produto

    const vp = new BaseRepositories('venda_produto');

    const venda_id = data.venda_id;

    produtos.forEach(p =>{

      const data = {venda_id, produto_id: p.produto_id, quantidade: p.quantidade }

      vp.insert({data})

    });

    // ajustar estoques
    this.atualizarEstoque(produtos);

    await VendaRepositories.update({data: {status: 'entregue'}, condicao: {venda_id: data.venda_id}});
    // No momento sistema apenas para estabelecimento físico com venda direta, por isso status = entregue.

    return { Venda_id: data.venda_id };
  }

  async select(filtros: any) {
    let retorno = await VendaRepositories.get({
      filtros,
    });

    return retorno;
  }

  async update(data: IVenda, Venda_id: string) {
    const venda = await this.select({ Venda_id });

    if (venda?.length === 0) throw { message: "Nenhum venda encontrado!" };

    // validar se existem produtos (array com ids)
    // calcular valor_final

    let retorno = await VendaRepositories.update({
      condicao: { Venda_id },
      data,
    });

    const produtos: IProdutosToAdd[] | undefined = data.produtos;

    delete data.produtos;

    // select em venda_produtos para pegar a quantidade anterior

    let atualizar = [{produto_id: '', diferenca: -2}]; // ex. removeu duas unidades do item

    // função para ver diferenças de quantidade

    // preencher tabela venda_produto

    // forEacth nos produtos e ajustar estoques de acordo com o obj atualizar

    return retorno;
  }

  async delete(Venda_id: string) {
    const Venda = await this.select({ Venda_id });

    if (Venda?.length === 0) throw { message: "Nenhum Venda encontrado!" };

    let retorno = await VendaRepositories.delete({
      condicao: { Venda_id },
    });

    return retorno;
  }

  async atualizarEstoque(produtosDaVenda: IProdutosToAdd[]) {

      const produtosComEstoqueAtual = await ProdutoRepositories.selectInIds([...produtosDaVenda.map(p => p.produto_id)]);

      const estoqueAtualPorProduto: any = {};
      produtosComEstoqueAtual.forEach(produto => {
        estoqueAtualPorProduto[produto.produto_id] = produto.quantidade_estoque;
      });

      const atualizacoesEmLote = produtosDaVenda.map(pv => {
        const estoqueAtual = estoqueAtualPorProduto[pv.produto_id];
        const novaQuantidade = estoqueAtual - pv.quantidade;
        return { produto_id: pv.produto_id, novaQuantidade };
      });


      await Connect.transaction(async (trx) => {
        for (const atualizacao of atualizacoesEmLote) {
          await trx('produto')
            .where('produto_id', atualizacao.produto_id)
            .update({ quantidade_estoque: atualizacao.novaQuantidade });
        }

    });
  
  }

  // Apenas para exemplo de várias interaação independentes no banco.
  // Uma pode falhar que as demais continuam, diferente de uma transação.
  async atualizarEstoquePromisseAll(produtosDaVenda: IProdutosToAdd[]) {

    const produtosParaAtualizar = await ProdutoRepositories.selectInIds([...produtosDaVenda.map(p => p.produto_id)]);

    // Constroi um array de promessas para atualização em lote
    const promessasAtualizacao = produtosDaVenda.map(async (p) => {

    const novaQuantidade = produtosParaAtualizar.find(pBd => pBd.quantidade_estoque = pBd.quantidade_estoque - p.quantidade);
  
      // Atualizar o estoque no banco de dados
      await ProdutoRepositories.update({data: {quantidade_estoque: novaQuantidade}, condicao: `produto_id =${p.produto_id}`});

    });

     // Aguardar a conclusão de todas as atualizações em lote
     await Promise.all(promessasAtualizacao);
  
  }
}

export default new VendaService();
