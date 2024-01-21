import { Request, Response } from "express";
import LoginService from "../services/LoginService";
import { IErrorReturn, ISuccessReturn } from "../../types/IReturnDefault";
import { Login } from "../../types/ILogin";
import { z } from "zod";
import { validateInput } from "../../helpers/helpers";

class LoginController {
  async login(req: Request, res: Response) {
    try {
      let data: z.infer<typeof Login> = req.body;

      validateInput(data, Login);

      let result = await LoginService.login(data);

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

export default new LoginController();
