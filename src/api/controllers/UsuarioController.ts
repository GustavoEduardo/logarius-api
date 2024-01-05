import {  Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';
import ErrorReturn from '../../helpers/serviceDefault/errorReturn';
import SuccessReturn from '../../helpers/serviceDefault/successReturn';

class UsuarioController{

    async create(req:Request,res:Response){
        try {

            let data = req.body;
            let result = await UsuarioService.create(data);            
    
            let retorno: any = SuccessReturn({
                result,
                message: "Usuário criado com sucesso"
            })
            
            res.status(retorno.code).json(retorno);

        }catch ( e: any ) {            
            let retorno: any = ErrorReturn({
                message: e.message,
                result: e.erros
            })
            return res.status(retorno.code).json(retorno);
        }
    }

    async select(req:Request,res:Response){
        try {
            let filtros = req.query
            let result = await UsuarioService.select(filtros);

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

    async update(req:Request,res:Response){
        try {
            let id = Number(req.params.id)
            let data = req.body
            let result = await UsuarioService.update(data,id);    
            
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

    async delete(req:Request,res:Response){
        try {
            let id = Number(req.params.id)
            let result = await UsuarioService.delete(id);    
            
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

    async getById(req:Request,res:Response){
        try {
            let id = Number(req.params.id)
            let result = await UsuarioService.getById(id);    
            
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

export default new UsuarioController();