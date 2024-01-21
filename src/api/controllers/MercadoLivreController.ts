import { Request, Response } from "express";
import MercadoLivreService from "../services/MercadoLivreService";
import { IErrorReturn, ISuccessReturn } from "../../types/IReturnDefault";

class MercadoLivreController {
  async create(req: Request, res: Response) {
    try {
      let data = req.body;
      let result = await MercadoLivreService.create(data);

      let retorno: ISuccessReturn = {
        result,
        message: "Usuário criado com sucesso",
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

  async select(req: Request, res: Response) {
    try {
      let filtros = req.query;
      let result = await MercadoLivreService.select(filtros);

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
      let id = Number(req.params.id);
      let data = req.body;
      let result = await MercadoLivreService.update(data, id);

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

  async delete(req: Request, res: Response) {
    try {
      let id = Number(req.params.id);
      let result = await MercadoLivreService.delete(id);

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

  async getById(req: Request, res: Response) {
    try {
      let id = Number(req.params.id);
      let result = await MercadoLivreService.getById(id);

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

export default new MercadoLivreController();
