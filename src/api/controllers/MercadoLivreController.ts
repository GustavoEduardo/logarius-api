import {  Request, Response } from 'express';
import MercadoLivreService from '../services/MercadoLivreService';
import ErrorReturn from '../../helpers/serviceDefault/errorReturn';
import SuccessReturn from '../../helpers/serviceDefault/successReturn';

class MercadoLivreController{

    async create(req:Request,res:Response){
        try {

            let data = req.body;
            let result = await MercadoLivreService.create(data);            
    
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
            let result = await MercadoLivreService.select(filtros);

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
            let result = await MercadoLivreService.update(data,id);    
            
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
            let result = await MercadoLivreService.delete(id);    
            
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
            let result = await MercadoLivreService.getById(id);    
            
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

export default new MercadoLivreController();