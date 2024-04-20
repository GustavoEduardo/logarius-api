import axios, { AxiosInstance } from "axios";
import BaseRepositories from "./BaseRepositories";
import { responseInterceptor } from "../../helpers/axios-interceptors";
import { Connect } from "./Connection";
import { whereQuery } from "../../helpers/helpers";

class VendaRepositorie extends BaseRepositories {
  private api: AxiosInstance;

  constructor() {
    super("venda");

    this.api = axios.create({
      baseURL: process.env.BASE_API_MT,
      headers: {
        Authorization: process.env.TOKEN_MT,
      },
    });
    responseInterceptor(this.api);
  }

  async select(filtros: any) {
    let query = Connect("venda AS v")
      .select(
        "v.*",
        Connect.raw(
          'IFNULL(JSON_ARRAYAGG(CASE WHEN p.produto_id IS NOT NULL THEN JSON_OBJECT("produto_id", p.produto_id, "nome", p.nome, "quantidade", vp.quantidade) END), JSON_ARRAY()) AS produtos'
        )
      )
      .leftJoin("venda_produto AS vp", "v.venda_id", "vp.venda_id")
      .leftJoin("produto AS p", "vp.produto_id", "p.produto_id")
      .groupBy("v.venda_id");

    query = whereQuery(query, filtros, 'v');

    if (filtros.ordem) query.orderBy(filtros.ordem, filtros.tipo_ordem);

    let perPage = filtros.perPage ? filtros.perPage : 50;
    let currentPage = filtros.page ? filtros.page : 1;

    return await query.paginate({
      perPage,
      currentPage,
      isLengthAware: true,
    });
  }
}

export default new VendaRepositorie();
