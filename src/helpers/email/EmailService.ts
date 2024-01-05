import * as nodemailer from 'nodemailer';
import { Config } from '../../config/config';
import path from "path";
import fs from "fs";
import { IEmailDTO, IEmailService } from '../../types/IEmail';

class EmailService implements IEmailService{

    async send({to, message, bcc}: IEmailDTO){
        try { 
            const transporter = nodemailer.createTransport({
                host: Config.mailHost,
                port: 465,
                secure: true,
                auth: {
                    user: Config.mailUser,
                    pass: Config.mailPassword
                }
            }) 
            let response = transporter.sendMail({
                from: Config.mailUser,
                to: to.email,
                subject: message.subject,
                text: message.body.replace(/(<([^>]+)>)/ig, ""),
                html: message.body                
            })
            console.log("Enviando email")            
            return true

        } catch(error) {
            console.error("MAIL ERROR => ", error)
            return false
        }
    }

    template(filename:string, replaces:any):string | boolean{
        try {

            let pathname = path.resolve(__dirname, `templates/${filename}`)
            let html = fs.readFileSync(pathname, "utf8")

            for(const [key, value] of Object.entries(replaces) ) {
                html = html.split(`{{${key}}}`).join(String(value))
            }
            return html

        } catch(error) {
            console.log("MAIL TEMPLATE ERROR => ", error)
            return false
        }
    }

}

export default EmailService;


