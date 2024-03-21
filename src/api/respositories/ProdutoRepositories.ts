import axios, { AxiosInstance } from "axios";
import BaseRepositories from "./BaseRepositories";
import { responseInterceptor } from "../../helpers/axios-interceptors";
import { Connect } from "./Connection";
import { IProdutosToAdd } from "../../types/IVenda";

class ProdutoRepositorie extends BaseRepositories {
  private api: AxiosInstance;

  constructor() {
    super("produto");

    this.api = axios.create({
      baseURL: process.env.BASE_API_MT,
      headers: {
        Authorization: process.env.TOKEN_MT,
      },
    });
    responseInterceptor(this.api);
  }

  async selectInIds(produtosIds: string[]) {
    return await Connect("produto")
      .whereIn(
        "produto_id",
        produtosIds.map((produto_id) => produto_id)
      )
      .select("produto_id", "quantidade_estoque", "nome");
  }

  async select(filtros: any) {
    // se tiver pesquisa camposLike deve ser obrigatório
    if (filtros.pesquisa) {
      filtros.camposLike = ["nome", "descricao"];
    }

    // para o filtro de data fazer o beteew aqui.
    // bolar forma de retornar só a query. (Separar função para paginação?)
    // Filtros pendentes

    return await this.get({ filtros });
  }
}

export default new ProdutoRepositorie();
