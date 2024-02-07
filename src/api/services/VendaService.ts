import { IProdutosToAdd, IVenda } from "../../types/IVenda";
import VendaRepositories from "../respositories/VendaRepositories";
import { randomUUID } from "crypto";

class VendaService {
  async create(data: IVenda) {

    // validar se existem produtos (array com ids)
    // calcular valor_final

    data.venda_id = randomUUID();

    data.status_pagamento = 'efetuado';
    data.status = 'entregue'; // no momento sistema apenas para estabelecimento físico com venda direta.

    const produtos: IProdutosToAdd[] | undefined = data.produtos;

    delete data.produtos;

    await VendaRepositories.insert({
      data,
    });

    // preencher tabela venda_produto

    // forEacth nos produtos e ajustar estoques


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
}

export default new VendaService();
