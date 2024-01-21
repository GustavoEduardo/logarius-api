import { IProduto } from "../../types/IProduto";
import ProdutoRepositories from "../respositories/ProdutoRepositories";
import { randomUUID } from "crypto";

class ProdutoService {
  async create(data: IProduto) {
    data.produto_id = randomUUID();

    await ProdutoRepositories.insert({
      data,
    });

    return { produto_id: data.produto_id };
  }

  async select(filtros: any) {
    let retorno = await ProdutoRepositories.get({
      filtros,
    });

    return retorno;
  }

  async update(data: IProduto, produto_id: string) {
    const produto = await this.select({ produto_id });

    if (produto?.length === 0)
      throw { message: "Nenhum produto encontrado com esse id!" };

    let retorno = await ProdutoRepositories.update({
      condicao: { produto_id },
      data,
    });

    return retorno;
  }

  async delete(produto_id: string) {
    const produto = await this.select({ produto_id });

    if (produto?.length === 0)
      throw { message: "Nenhum produto encontrado com esse id!" };

    let retorno = await ProdutoRepositories.delete({
      condicao: { produto_id },
    });

    return retorno;
  }
}

export default new ProdutoService();
