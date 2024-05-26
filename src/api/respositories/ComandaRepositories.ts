import BaseRepositories from "./BaseRepositories";
import { Connect } from "./Connection";
import { whereQuery } from "../../helpers/helpers";

class ComandaRepositories extends BaseRepositories {
  async select(filtros: any) {
    let query = Connect("comanda AS c")
      .select(
        "c.comanda_id",
        "c.titulo",
        "c.observacao",
        "c.status_comanda",
        "c.valor_pago",
        "v.*",
        Connect.raw(
          'IFNULL(JSON_ARRAYAGG(CASE WHEN p.produto_id IS NOT NULL THEN JSON_OBJECT("produto_id", p.produto_id, "nome", p.nome, "preco", p.preco, "quantidade", vp.quantidade) END), JSON_ARRAY()) AS produtos'
        )
      )
      .join("venda AS v", "c.venda_id", "v.venda_id")
      .leftJoin("venda_produto AS vp", "v.venda_id", "vp.venda_id")
      .leftJoin("produto AS p", "vp.produto_id", "p.produto_id")
      .groupBy("c.comanda_id")
      .orderBy('status_comanda','asc');

    if (filtros.pesquisa) {
      query.whereILike(`c.titulo`, `%${filtros.pesquisa}%`);
    }

    if (filtros.status_comanda) {
      query.whereIn('c.status_comanda',filtros.status_comanda.split(','))
      delete filtros.status_comanda;
    }

    query = whereQuery(query, filtros, "c");

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

export default new ComandaRepositories("comanda");
