import { Config } from '../../config/config';
import { IUsuario } from '../../types/IUsuario';
import MercadoLivreRepositories from '../respositories/MercadoLivreRepositories';
import bcryptjs from 'bcryptjs';


class MercadoLivreService {
    
    async create(data: IUsuario){
        delete data.confirmeSenha

        if(Config.jwtSalt){
            var salt: any = bcryptjs.genSaltSync(parseInt(Config.jwtSalt));
        } 
        data.senha = bcryptjs.hashSync(data.senha, salt),
        data.status = "ativo"
        
        let retorno = await MercadoLivreRepositories.insert({
            data
        });
        
        return retorno        

    }

    async select(filtros: any){

        let retorno = await MercadoLivreRepositories.get({
            filtros
        })


        return retorno        

    }

    async update(data: IUsuario,id_admin: any){

        //validator

        let retorno = await MercadoLivreRepositories.update({
            condicao: {id_admin},
            data
        });
        
        return retorno        

    }

    async delete(id_admin: any){

        //validator

        let retorno = await MercadoLivreRepositories.delete({
            condicao: {id_admin}
        });
        
        return retorno        

    }

    async getById(id_admin: any){

        //validator

        let retorno = await MercadoLivreRepositories.get({
            // raw: `id_admin = '${id_admin}'`,
            filtros: {id_admin}

        });
        
        return retorno        

    }

}

export default new MercadoLivreService();