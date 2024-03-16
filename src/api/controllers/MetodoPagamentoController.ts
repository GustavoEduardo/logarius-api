import { Request, Response } from "express";
import MetodoPagamentoService from "../services/MetodoPagamentoService";
import { z } from "zod";
import { MetodoPagamento } from "../../types/IMetodoPagamento";
import { IErrorReturn, ISuccessReturn } from "../../types/IReturnDefault";
import { validateInput } from "../../helpers/helpers";

class MetodoPagamentoController {
  async create(req: Request, res: Response) {
    try {
      let data: z.infer<typeof MetodoPagamento> = req.body;

      validateInput(data, MetodoPagamento);

      let metodo = await MetodoPagamentoService.select({metodo: data.metodo});

      if (metodo?.length) throw { message: "Método de pagamento já existe!" };

      let result = await MetodoPagamentoService.create(data);

      let retorno: ISuccessReturn = {
        result,
        message: "Método de pagamento criado com sucesso",
      };

      res.status(200).json(retorno);
    } catch (e: any) {
      let retorno: IErrorReturn = {
        message: e.message,
        result: e.error,
      };

      return res.status(400).json(retorno);
    }
  }

  async select(req: Request, res: Response) {
    try {
      let filtros = req.query;
      let result = await MetodoPagamentoService.select(filtros);

      let retorno: ISuccessReturn = { result };

      return res.status(200).json(retorno);
    } catch (e: any) {
      let retorno: IErrorReturn = {
        message: e.message,
        result: e.error,
      };

      return res.status(400).json(retorno);
    }
  }

}

export default new MetodoPagamentoController();
