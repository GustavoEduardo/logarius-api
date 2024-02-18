import { IProdutosToAdd, IVenda } from "../../types/IVenda";
import BaseRepositories from "../respositories/BaseRepositories";
import { Connect } from "../respositories/Connection";
import ProdutoRepositories from "../respositories/ProdutoRepositories";
import VendaRepositories from "../respositories/VendaRepositories";
import { randomUUID } from "crypto";

class VendaService {
  async create(data: IVenda) {
    if (!data.produtos?.length) {
      throw { message: "A venda precisa ter pelo menos um item!" };
    }

    data.valor_final = data.valor - (data.valor_desconto || 0);

    data.venda_id = randomUUID();

    data.status_pagamento = "efetuado"; // Implementar integração cartão e pix.
    data.status = "pendente"; // status até concluir atualização de estoques e relacionamento com produtos.

    data.endereco_entrega = data.endereco_entrega || null;

    const produtos: IProdutosToAdd[] = data.produtos;

    delete data.produtos;

    await VendaRepositories.insert({
      data,
    });

    // preenche tabela de relacionamento venda_produto

    await Connect.transaction(async (trx) => {
      for (const atualizacao of produtos) {
        await trx("venda_produto").insert({
          quantidade: atualizacao.quantidade,
          produto_id: atualizacao.produto_id,
          venda_id: data.venda_id,
        });
      }
    });

    // ajustar estoques
    this.atualizarEstoque(produtos);

    await VendaRepositories.update({
      data: { status: "entregue" },
      condicao: { venda_id: data.venda_id },
    });
    // No momento sistema apenas para estabelecimento físico com venda direta, por isso status = entregue.

    return { Venda_id: data.venda_id };
  }

  async select(filtros: any) {
    let retorno = await VendaRepositories.get({
      filtros,
    });

    return retorno;
  }

  async update(data: IVenda, venda_id: string) {
    const venda = await this.select({ venda_id });

    if (venda?.length === 0 || ["removida"].includes(venda[0].status))
      throw { message: "Nenhuma venda encontrada!" };

    if (data.valor) {
      data.valor_final = data.valor_desconto?.toString()
        ? (data.valor_final = data.valor - data.valor_desconto)
        : data.valor - (venda[0].valor_desconto || 0);
    }

    let produtosDaVenda: IProdutosToAdd[] | null = null;

    if (data.produtos) {
      produtosDaVenda = data.produtos;

      delete data.produtos;
    }

    let toUpdateEstoque: IProdutosToAdd[] = [];
    let toUpdateVPLote: {
      venda_id: string;
      produto_id: string;
      quantidade: number;
    }[] = [];

    // para novos itens
    let toAddEstoque: IProdutosToAdd[] = [];
    let toAddVPLote: {
      venda_id: string;
      produto_id: string;
      quantidade: number;
    }[] = [];

    if (produtosDaVenda) {
      const vp = new BaseRepositories("venda_produto");

      let qtd_anterior = await vp.get({ filtros: { venda_id } });

      const estoque_atual = await ProdutoRepositories.selectInIds([
        ...produtosDaVenda.map((p) => p.produto_id),
      ]);

      // para atualizar tabela venda_produto e validar estoque do item
      produtosDaVenda.forEach((p) => {
        if (p.quantidade < 0) throw { message: `Quantidade inválida!` };

        let ea = estoque_atual.find((ea: any) => ea.produto_id);
        let qtdA = qtd_anterior.find(
          (q: { produto_id: string }) => q.produto_id === p.produto_id
        );

        let dif = 0;

        if (qtdA) {
          dif = qtdA.quantidade - p.quantidade;

           // valida se exites estoque suficiente
          if (qtdA.quantidade < p.quantidade && (ea.quantidade_estoque < (p.quantidade - qtdA.quantidade))) {
            throw { message: `Estoque insuficinte para o item ${ea.nome}.` };
          }

        } else if (p.quantidade) {

            // valida se exites estoque suficiente
            if (p.quantidade > ea.quantidade_estoque) {
              throw { message: `Estoque insuficinte para o item ${ea.nome}.` };
            }


          toAddVPLote.push({
            venda_id,
            produto_id: p.produto_id,
            quantidade: p.quantidade,
          });
        }

        if (dif) {
          toUpdateVPLote.push({
            venda_id,
            produto_id: p.produto_id,
            quantidade: p.quantidade,
          });
        }
      });

      // ajusta estoques
      estoque_atual.forEach((ea) => {
        let nova_qtd = 0;

        const pa = qtd_anterior.find(
          (p: any) => p.produto_id === ea.produto_id
        );

        const pv: any = produtosDaVenda?.find(
          (p: any) => p.produto_id === ea.produto_id
        );

        if (pa) {
          if (pa.quantidade > pv.quantidade) {
            const toAdd = pa.quantidade - pv.quantidade;
            nova_qtd = ea.quantidade_estoque + toAdd;
          }

          if (pa.quantidade < pv.quantidade) {
            const toSub = pv.quantidade - pa.quantidade;
            nova_qtd = ea.quantidade_estoque - toSub;
          }

          if (pa.quantidade !== pv.quantidade){
            toUpdateEstoque.push({
              produto_id: ea.produto_id,
              valor: ea.valor,
              quantidade: nova_qtd,
            });

          }

        } else {
          toAddEstoque.push({
            produto_id: ea.produto_id,
            valor: ea.valor,
            quantidade: pv.quantidade,
          });
        }
      });
    }

    let retorno = await VendaRepositories.update({
      condicao: { venda_id },
      data,
    });

    if (toUpdateEstoque.length) this.atualizarEstoque(toUpdateEstoque, true);
    if (toAddEstoque.length) this.atualizarEstoque(toAddEstoque);

    if (toUpdateVPLote.length) {
      await Connect.transaction(async (trx) => {
        for (const atualizacao of toUpdateVPLote) {
          if (atualizacao.quantidade) {
            await trx("venda_produto")
              .where("venda_id", atualizacao.venda_id)
              .andWhere("produto_id", atualizacao.produto_id)
              .update({ quantidade: atualizacao.quantidade });
          } else {
            await trx("venda_produto")
              .where("venda_id", atualizacao.venda_id)
              .andWhere("produto_id", atualizacao.produto_id)
              .delete();
          }
        }
      });
    }

    if (toAddVPLote.length) {
      await Connect.transaction(async (trx) => {
        for (const atualizacao of toAddVPLote) {
          await trx("venda_produto").insert({
            quantidade: atualizacao.quantidade,
            produto_id: atualizacao.produto_id,
            venda_id: atualizacao.venda_id,
          });
        }
      });
    }

    return retorno;
  }

  async delete(venda_id: string) {
    const venda = await this.select({ venda_id });

    if (venda?.length === 0) throw { message: "Nenhuma venda encontrada!" };

    let retorno = await VendaRepositories.update({
      condicao: { venda_id },
      data: { status: "removida" },
    });

    return retorno;
  }

  async atualizarEstoque(produtosDaVenda: IProdutosToAdd[], update = false) {
    if (!produtosDaVenda.length) return;

    const produtosComEstoqueAtual = await ProdutoRepositories.selectInIds([
      ...produtosDaVenda.map((p) => p.produto_id),
    ]);

    const estoqueAtualPorProduto: any = {};
    produtosComEstoqueAtual.forEach((produto) => {
      estoqueAtualPorProduto[produto.produto_id] = produto.quantidade_estoque;
    });

    let atualizacoesEmLote: any = [];

    if (update) {
      atualizacoesEmLote = produtosDaVenda.map((pv) => {
          return { produto_id: pv.produto_id, novaQuantidade: pv.quantidade };
      });
    } else {
      atualizacoesEmLote = produtosDaVenda.map((pv) => {
        const estoqueAtual = estoqueAtualPorProduto[pv.produto_id];
        const novaQuantidade = estoqueAtual - pv.quantidade;
        return { produto_id: pv.produto_id, novaQuantidade };
      });
    }

    if (atualizacoesEmLote[0]) {
      await Connect.transaction(async (trx) => {
        for (const atualizacao of atualizacoesEmLote) {
          await trx("produto")
            .where("produto_id", atualizacao.produto_id)
            .update({ quantidade_estoque: atualizacao.novaQuantidade });
        }
      });
    }
  }

  // Apenas para exemplo de várias interação independentes no banco.
  // Uma pode falhar que as demais continuam, diferente de uma transação.
  async atualizarEstoquePromisseAll(produtosDaVenda: IProdutosToAdd[]) {
    const produtosParaAtualizar = await ProdutoRepositories.selectInIds([
      ...produtosDaVenda.map((p) => p.produto_id),
    ]);

    // Constroi um array de promessas para atualização em lote
    const promessasAtualizacao = produtosDaVenda.map(async (p) => {
      const novaQuantidade = produtosParaAtualizar.find(
        (pBd) =>
          (pBd.quantidade_estoque = pBd.quantidade_estoque - p.quantidade)
      );

      // Atualizar o estoque no banco de dados
      await ProdutoRepositories.update({
        data: { quantidade_estoque: novaQuantidade },
        condicao: `produto_id =${p.produto_id}`,
      });
    });

    // Aguardar a conclusão de todas as atualizações em lote
    await Promise.all(promessasAtualizacao);
  }
}

export default new VendaService();
