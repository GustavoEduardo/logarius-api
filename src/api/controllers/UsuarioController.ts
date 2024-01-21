import { Request, Response } from "express";
import UsuarioService from "../services/UsuarioService";
import { IErrorReturn, ISuccessReturn } from "../../types/IReturnDefault";

class UsuarioController {
  async create(req: Request, res: Response) {
    try {
      let data = req.body;
      let result = await UsuarioService.create(data);

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
      let result = await UsuarioService.select(filtros);

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
      let result = await UsuarioService.update(data, id);

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
      let result = await UsuarioService.delete(id);

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

  async get(req: Request, res: Response) {
    try {
      let id = Number(req.params.id);
      let result = await UsuarioService.get(id);

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

export default new UsuarioController();
