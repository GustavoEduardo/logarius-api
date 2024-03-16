import { IMetodoPagamento } from "../../types/IMetodoPagamento";
import MetodoPagamentoRepositories from "../respositories/MetodoPagamentoRepositories";
import { randomUUID } from "crypto";

class MetodoPagamentoService {
  async create(data: IMetodoPagamento) {
    data.metodo_pagamento_id = randomUUID();

    await MetodoPagamentoRepositories.insert({
      data,
    });

    return { metodo_pagamento_id: data.metodo_pagamento_id };
  }

  async select(filtros: any) {
    let retorno = await MetodoPagamentoRepositories.get({
      filtros,
    });

    return retorno;
  }
}

export default new MetodoPagamentoService();
