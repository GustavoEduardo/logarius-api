import {Connect} from './Connection';
import ILogin from '../../types/ILogin';
import bcryptjs from 'bcryptjs';


class LoginRepositories{

    async login(data:ILogin){        
        let usuario = await Connect.select("id","nome","email","senha").table("usuarios").where({email: data.email}).andWhere({status: "ativo"});
        let correct = bcryptjs.compareSync(data.senha, usuario[0].senha)      

        if(correct){            
            return usuario;
        }      
    }
}

export default new LoginRepositories();