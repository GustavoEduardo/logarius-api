import ILogin from '../../types/ILogin';
// import LoginRepositories from '../repositories/LoginRepositories';
import { Config } from '../../config/config';
import jwt from 'jsonwebtoken';
import BaseRepositories from '../respositories/BaseRepositories';


class LoginService {
    
    async login(data: ILogin){

        
        //let usuario: any = await LoginRepositories.login(data);
        let br = new BaseRepositories('adimin')
        let usuario: any = await br.get({
            filtros: data
        })

   
        if(usuario && usuario.length > 0){
            var dados: any = {id: usuario[0].id_usuario}
        }else{
            throw {message:'Usuario ou senha invalidos'}
        }
        
        if(dados && Config.jwtSecret){
            let retorno = jwt.sign(dados, Config.jwtSecret, {
                expiresIn: 28000
            });
            console.log(retorno)
            return retorno
        }else{
            throw {message:'Usuario ou senha invalidos'}
        }

    }  

}

export default new LoginService();