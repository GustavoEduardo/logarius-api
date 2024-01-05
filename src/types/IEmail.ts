export interface IEmailTo {
    name?: string
    email: string
}

export interface IEmailMessage {
    subject: string
    body: string
    attachment?: string[]
}

export interface IEmailDTO {
    to: IEmailTo, 
    message: IEmailMessage
    bcc?: IEmailTo, 
}

export interface IEmailService {
    send(request: IEmailDTO): Promise<boolean>
}


//Para cada email
export interface INovocontato {    
    to:any
    replaces: {
        nome:string
        email:string
        mensagem:string
    }
}
