import moment from 'moment';
import { IDelete, IGet, IInsert, IUpdate } from '../../types/repositories/IBaseCrud';
import {Connect} from './Connection';

export default class BaseRepositories{
    //propriedade privada '#' node 15+
    #tabela: any;

    constructor(tabela: string){
        this.#tabela = tabela
    }

    async validaColuna(tabela: string,coluna: string,msg: string = " não é um filtro válido") {
        let infoColumns = await Connect.table(tabela).columnInfo()
       
        if(!infoColumns.hasOwnProperty(String(coluna))){
            throw {message: coluna +msg}
        }     
    }

    async insert({
        data = {}
    }:IInsert){

        data.criado = moment().format("YYYY-MM-DD HH-mm-ss")
        data.modificado = moment().format("YYYY-MM-DD HH-mm-ss")

        let colunas = Object.entries(data)
        for(let c of colunas){
            await this.validaColuna(this.#tabela,String([c[0]])," não existe na tabela "+this.#tabela)
        }

        try {
            var retorno = await Connect.table(this.#tabela).insert(data);
        } catch (e: any) {
            return e.message;
        }
        
        return retorno[0];   
    }

    async get({
        filtros = {},
        campos = "*",
        raw = "",
        rawType = ""
    }:IGet){

        let tipo_ordem = "asc"
        let query = Connect.table(this.#tabela).select(campos);
    
        if(filtros && Object.values(filtros).length > 0){
            
            if(filtros.ordem){
                await this.validaColuna(this.#tabela,filtros.ordem)
                var ordem = filtros.ordem
                delete filtros.ordem
            }

            if(filtros.tipo_ordem){
                if(filtros.tipo_ordem != "asc" && filtros.tipo_ordem != "desc"){
                    throw {message:"O tipo da ordenação deve ser desc ou asc"}
                }
                tipo_ordem = filtros.tipo_ordem
                delete filtros.tipo_ordem
            }

            filtros = Object.entries(filtros)
            try {
                for(let f of filtros){
                    await this.validaColuna(this.#tabela,String([f[0]]))                  
                    let filtro = {[f[0]]: f[1]}
                    query.where(filtro)                               
                }                
            }catch ( e: any ) {                
                return e.message;
            }
    
        }        

        if(ordem){
            query.orderBy(ordem,tipo_ordem)
        }

        if(raw){
            if(!rawType || rawType == "where"){
                query.whereRaw(raw)
            }else if(rawType == "join"){
                query.joinRaw(raw)
            }            
        }
        
        let retorno = await query
        return retorno;
        
    }

    async update({
        data={},
        condicao = {},
        raw = ""
    }:IUpdate){
        data.modificado = moment().format("YYYY-MM-DD HH-mm-ss")
        let query = Connect.table(this.#tabela).update(data);
        if(condicao && Object.values(condicao).length > 0){            
            condicao = Object.entries(condicao)
            try {
                for(let c of condicao){
                    await this.validaColuna(this.#tabela,String([c[0]]))                  
                    let filtro = {[c[0]]: c[1]}
                    query.where(filtro)                               
                }                
            }catch ( e: any ) {                
                return e.message;
            }    
        }else{
            throw {message:"Informe a condição"}
        }

        if(raw){
            query.whereRaw(raw)
        }

        let retorno = await query

        return retorno;
    }

    async delete({
        condicao ={}
    }:IDelete) {
        
        let query = Connect.table(this.#tabela).delete();
        if(condicao && Object.values(condicao).length > 0){            
            condicao = Object.entries(condicao)
            try {
                for(let c of condicao){
                    await this.validaColuna(this.#tabela,String([c[0]]))                  
                    let filtro = {[c[0]]: c[1]}
                    query.where(filtro)                               
                }                
            }catch ( e: any ) {                
                return e.message;
            }    
        }else{
            throw {message:"Informe a condição"}
        }

        let retorno = await query

        return retorno;
        
    }
}
