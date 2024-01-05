export interface IErrorReturn{
    status?:string,
    message?:string,
    code?: number
    result?:string|any
}

export interface ISuccessReturn{
    status?:string,
    message?:string,
    code?: number,
    result?: Object|any 
}