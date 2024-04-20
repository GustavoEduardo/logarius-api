import { Request, Response } from "express";
import ComandaService from "../services/ComandaService";
import { z } from "zod";
import { Comanda, ComandaEdit } from "../../types/IComanda";
import { IErrorReturn, ISuccessReturn } from "../../types/IReturnDefault";
import { validateInput } from "../../helpers/helpers";

class ComandaController {
  async create(req: Request, res: Response) {
    try {
      let data: z.infer<typeof Comanda> = req.body;

      validateInput(data, Comanda);

      let result = await ComandaService.create(data);

      let retorno: ISuccessReturn = {
        result,
        message: "Comanda criada com sucesso",
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
      let result = await ComandaService.select(filtros);

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

  async update(req: Request, res: Response) {
    try {
      let data = req.body;

      validateInput(data, ComandaEdit);

      let result = await ComandaService.update(data, req.params.id);

      let retorno: ISuccessReturn = {
        result,
        message: "Comanda alterada com sucesso.",
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

  async delete(req: Request, res: Response) {
    try {
      let result = await ComandaService.cancelar(req.params.id);

      let retorno: ISuccessReturn = {
        result,
        message: "Comanda removida com sucesso.",
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

export default new ComandaController();
