import { ILogin } from "../../types/ILogin";
import { Config } from "../../config/config";
import jwt from "jsonwebtoken";
import LoginRepositories from "../respositories/LoginRepositories";

class LoginService {
  async login(data: ILogin) {
    let usuario: any = await LoginRepositories.login(data);

    if (usuario && usuario.length > 0) {
      var dados: any = { id: usuario[0].id_usuario };
    } else {
      throw { message: "Usuario ou senha invalidos!" };
    }

    delete dados.senha;

    if (dados && Config.jwtSecret) {
      let retorno = jwt.sign(dados, Config.jwtSecret, {
        expiresIn: 28000,
      });

      return retorno;
    } else {
      throw { message: "Usuario ou senha invalidos!" };
    }
  }
}

export default new LoginService();
