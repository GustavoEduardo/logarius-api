import { Config } from "../../config/config";
import { IProduto } from "../../types/IProduto";
import bcryptjs from 'bcryptjs';
import IUsuario from "../../types/IUsuario";
import ProdutoRepositories from "../respositories/ProdutoRepositories";
import UsuarioRepositories from "../respositories/UsuarioRepositories";

class UsuarioService {
  async create(data: IUsuario){
    delete data.confirmeSenha

    if(Config.jwtSalt){
        var salt: any = bcryptjs.genSaltSync(parseInt(Config.jwtSalt));
    } 
    data.senha = bcryptjs.hashSync(data.senha, salt),
    data.status = "ativo"
    
    let retorno = await UsuarioRepositories.insert({
        data
    });
    
    return retorno        

}
  async select(filtros: any) {
    let retorno = await ProdutoRepositories.get({
      filtros,
    });

    return retorno;
  }

  async update(data: IUsuario, id_admin: any) {
    //validator

    let retorno = await ProdutoRepositories.update({
      condicao: { id_admin },
      data,
    });

    return retorno;
  }

  async delete(id_admin: any) {
    //validator

    let retorno = await ProdutoRepositories.delete({
      condicao: { id_admin },
    });

    return retorno;
  }

  async get(id_admin: any) {
    //validator

    let retorno = await ProdutoRepositories.get({
      // raw: `id_admin = '${id_admin}'`,
      filtros: { id_admin },
    });

    return retorno;
  }
}

export default new UsuarioService();
