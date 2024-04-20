import { IComanda } from "../../types/IComanda";
import ComandaRepositories from "../respositories/ComandaRepositories";
import { randomUUID } from "crypto";
import VendaService from "./VendaService";
import { IVenda } from "../../types/IVenda";

class ComandaService {
  async create(data: IComanda) {
    let existe: any = await ComandaRepositories.get({
      filtros: { titulo: data.titulo, status_comanda: "Aberta" },
    });

    if (existe?.length) {
      throw { message: "Já existe uma comanda ativa com esse título!" };
    }

    data.comanda_id = randomUUID();
    data.status_comanda = "aberta";

    // cria com metodo de pagamento fiado
    const venda = await VendaService.create({
      metodo_pagamento_id: "1d463d2f-cf7c-4cae-9773-bc76221ccbdc",
      cliente_id: data.cliente_id || "26b2e433-3e08-47e9-a10b-f5617612044f",
      valor: 0,
      valor_desconto: 0,
      origem: "comanda",
      status_pagamento: "pendente",
    });

    data.venda_id = venda.venda_id;

    await ComandaRepositories.insert({
      data,
    });

    return { comanda_id: data.comanda_id };
  }

  async select(filtros: any) {
    let retorno = await ComandaRepositories.select(filtros);

    retorno.data.forEach((c) => {
      retorno.data.forEach((c) => {
        c.produtos = c.produtos[0] ? c.produtos : [];
      });
    });

    return retorno;
  }

  async update(data: IVenda | IComanda | any, comanda_id: string) {
    const res = await this.select({ comanda_id });

    const comanda = res.data;

    if (comanda?.length === 0) throw { message: "Nenhuma Comanda encontrada!" };

    if (comanda.length && ["cancelada"].includes(comanda[0].status)) {
      throw { message: "Não é possível editar uma comanda cancelada!" };
    }

    let toUpdateComanda = {
      titulo: data.titulo,
      status_comanda: data.status_comanda,
      venda_id: data.venda_id,
      valor_pago: data.valor_pago
    };

    if (data.status_comanda){
      toUpdateComanda.status_comanda = data.status_comanda;
    }

    if (!data.apenasComanda) {
      // Para casos onde a atualização da venda não é necessária.

      
      if (data.status_comanda = 'Fechada') {
        data.status_pagamento = 'efetuado';
        data.status = 'confirmada';
      }

      delete data.titulo;
      delete data.updated_at;
      delete data.created_at;
      delete data.status_comanda;
      delete data.valor_pago;

      await VendaService.update(data, data.venda_id);
    }

    let retorno = await ComandaRepositories.update({
      condicao: { comanda_id },
      data: toUpdateComanda,
    });

    return retorno;
  }

  async cancelar(comanda_id: string) {
    const comanda: any = await this.select({ comanda_id });

    if (comanda?.data.length === 0)
      throw { message: "Nenhuma comanda encontrada!" };

    await VendaService.cancelar(comanda.data.venda_id);

    let retorno = await ComandaRepositories.update({
      condicao: { comanda_id },
      data: { status: "cancelada" },
    });

    return retorno;
  }
}

export default new ComandaService();
