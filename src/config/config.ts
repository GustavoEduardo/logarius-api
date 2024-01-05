import 'dotenv/config';

let Config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    url: process.env.URL,

    //banco de dados
    databaseConnection:process.env.DATABASE_CONNECTION,
    databaseUser:process.env.DATABASE_USER,
    databasePort:process.env.DATABASE_PORT,
    databasePassword:process.env.DATABASE_PASSWORD,
    databaseDatabase:process.env.DATABASE_DATABASE,
    databaseTimeZone: process.env.DATABASE_TZ,

    //JWT
    jwtSecret:process.env.SECRET,
    jwtSalt:process.env.SALT,


    //email
    mailHost:process.env.MAIL_HOST,
    mailService:process.env.MAIL_SERVICE,
    mailPort:process.env.MAIL_PORT,
    mailSecure:process.env.MAIL_SECURE,
    mailUser:process.env.MAIL_USER,
    mailPassword:process.env.MAIL_PASSWORD,



}


export {Config}