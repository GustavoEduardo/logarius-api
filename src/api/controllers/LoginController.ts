import {  Request, Response } from 'express';
import LoginService from '../services/LoginService';
import ErrorReturn from '../../helpers/serviceDefault/errorReturn';
import SuccessReturn from '../../helpers/serviceDefault/successReturn';

class LoginController{

    async login(req:Request,res:Response){
        try {
            let data = req.body;
            let result = await LoginService.login(data);
    
            let retorno: any = SuccessReturn({result})

            return res.status(retorno.code).json(retorno);

        }catch ( e: any ) {
            
            let retorno: any = ErrorReturn({
                message: e.message,
                result: e.erros
            })

            return res.status(retorno.code).json(retorno);
        }
    }

}

export default new LoginController();