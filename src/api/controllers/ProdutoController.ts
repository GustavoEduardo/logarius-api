import { Request, Response } from "express";
import ProdutoService from "../services/ProdutoService";
import { z } from "zod";
import { Produto, ProdutoEdit } from "../../types/IProduto";
import { IErrorReturn, ISuccessReturn } from "../../types/IReturnDefault";
import { validateInput } from "../../helpers/helpers";

class ProdutoController {
  async create(req: Request, res: Response) {
    try {
      let data: z.infer<typeof Produto> = req.body;

      validateInput(data, Produto);

      let result = await ProdutoService.create(data);

      let retorno: ISuccessReturn = {
        result,
        message: "Produto criado com sucesso",
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
      let result = await ProdutoService.select(filtros);

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

      validateInput(data, ProdutoEdit);

      let result = await ProdutoService.update(data, req.params.id);

      let retorno: ISuccessReturn = {
        result,
        message: "Produto alterado com sucesso.",
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
      let result = await ProdutoService.delete(req.params.id);

      let retorno: ISuccessReturn = {
        result,
        message: "Produto removido com sucesso.",
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

export default new ProdutoController();
