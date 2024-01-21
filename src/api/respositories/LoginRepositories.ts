import {Connect} from './Connection';
import {ILogin} from '../../types/ILogin';
import bcryptjs from 'bcryptjs';


class LoginRepositories{

    async login(data:ILogin){        
        let usuario = await Connect.select("usuario_id","nome","email", "senha").table("usuario").where({login: data.login}).andWhere({status: "ativo"});

        if (!usuario?.length) return false;

        let correct = bcryptjs.compareSync(data.senha, usuario[0].senha)      

        if(correct){            
            return usuario;
        }      
    }
}

export default new LoginRepositories();