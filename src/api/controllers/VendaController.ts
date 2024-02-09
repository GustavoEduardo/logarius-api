import { Request, Response } from "express";
import VendaService from "../services/VendaService";
import { z } from "zod";
import { Venda, VendaEdit } from "../../types/IVenda";
import { IErrorReturn, ISuccessReturn } from "../../types/IReturnDefault";
import { validateInput } from "../../helpers/helpers";

class VendaController {
  async create(req: Request, res: Response) {
    try {
      let data: z.infer<typeof Venda> = req.body;

      validateInput(data, Venda);

      let result = await VendaService.create(data);

      let retorno: ISuccessReturn = {
        result,
        message: "Venda realizada com sucesso",
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

  // add páginação e criar metodo em rep. com filtro de datas
  async select(req: Request, res: Response) {
    try {
      let filtros = req.query;
      let result = await VendaService.select(filtros);

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

  // implementar
  async update(req: Request, res: Response) {
    try {
      let data = req.body;

      validateInput(data, VendaEdit);

      let result = await VendaService.update(data, req.params.id);

      let retorno: ISuccessReturn = {
        result,
        message: "Venda alterado com sucesso.",
      };

      return res.status(200).json(retorno);
    } catch (e: any) {
      let retorno: IErrorReturn = {
        message: e.message,
        result: e.error,
      };

      return res.status(400).json(retorno);
    }
  }

  // mudar status e voltar estoques
  async delete(req: Request, res: Response) {
    try {
      let result = await VendaService.delete(req.params.id);

      let retorno: ISuccessReturn = {
        result,
        message: "Venda removida com sucesso.",
      };

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

export default new VendaController();
