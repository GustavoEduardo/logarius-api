import { Config } from "../../config/config";
import bcryptjs from "bcryptjs";
import { IUsuario } from "../../types/IUsuario";
import UsuarioRepositories from "../respositories/UsuarioRepositories";
import { validateEmail } from "../../helpers/helpers";
import { randomUUID } from "crypto";
import UsuarioPerfilRepositories from "../respositories/UsuarioPerfilRepositories";

class UsuarioService {
  async create(data: IUsuario) {
    // Validações ------------

    if (!validateEmail(data.email)) throw { message: "Email inválido" };

    let user: any = await this.select({ email: data.email });

    if (user?.length)
      throw { message: "Email já está sendo utilidado por outro usuário!" };

    user = await this.select({ login: data.login });

    if (user?.length)
      throw { message: "Login já está sendo utilidado por outro usuário!" };

    if (data.senha !== data.confirmeSenha)
      throw { message: "As senhas devem ser iguais!" };
    delete data.confirmeSenha;

    // ------------

    if (!data.perfis_de_acesso?.length)
      throw {
        message: "Informe pelo menos um perfil de acesso para o usuário.",
      };

    const perfis = data.perfis_de_acesso;

    delete data.perfis_de_acesso;

    if (Config.jwtSalt) {
      var salt: any = bcryptjs.genSaltSync(parseInt(Config.jwtSalt));
    }
    data.senha = bcryptjs.hashSync(data.senha, salt);

    data.usuario_id = randomUUID();

    let result = await UsuarioRepositories.insert({
      data,
    });

    for (let p of perfis) {
      await UsuarioPerfilRepositories.insert({
        data: {
          usuario_id: data.usuario_id,
          perfil_acesso_id: p,
        },
      });
    }

    return { usuario_id: data.usuario_id, result };
  }

  async select(filtros: any) {
    let retorno = await UsuarioRepositories.get({
      filtros,
    });

    return retorno;
  }

  async update(data: IUsuario, usuario_id: string) {
    // Validações ------------

    const user: any = await this.select({ usuario_id });

    if (user?.length === 0) throw { message: "Nenhum usuário encontrado!" };

    const perfis = data.perfis_de_acesso;
    delete data.perfis_de_acesso;

    if (data.senha) {
      if (data.senha !== data.confirmeSenha)
        throw { message: "As senhas devem ser iguais!" };
      delete data.confirmeSenha;

      if (Config.jwtSalt) {
        var salt: any = bcryptjs.genSaltSync(parseInt(Config.jwtSalt));
      }

      data.senha = bcryptjs.hashSync(data.senha, salt);
    }

    if (data.email) {
      if (!validateEmail(data.email)) throw { message: "Email inválido" };

      const user: any = await this.select({ email: data.email });

      if (user?.length && user[0].usuario_id !== usuario_id)
        throw { message: "Email já está sendo utilidado por outro usuário!" };
    }

    if (data.login) {
      const user: any = await this.select({ login: data.login });

      if (user?.length && user[0].usuario_id !== usuario_id)
        throw { message: "Login já está sendo utilidado por outro usuário!" };
    }

    // ------------

    let retorno = await UsuarioRepositories.update({
      condicao: { usuario_id },
      data,
    });

    if (perfis && perfis.length) {
      for (let p of perfis) {
        await UsuarioPerfilRepositories.insert({
          data: {
            usuario_id: data.usuario_id,
            perfil_acesso_id: p,
          },
        });
      }
    }

    return retorno;
  }

  async delete(usuario_id: string) {
    const user: any = await this.select({ usuario_id });

    if (user?.length === 0) throw { message: "Nenhum usuário encontrado!" };

    let retorno = await UsuarioRepositories.delete({
      condicao: { usuario_id },
    });

    return retorno;
  }
}

export default new UsuarioService();
