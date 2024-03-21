import {Config} from '../../config/config';
import knex from 'knex'
import { attachPaginate } from 'knex-paginate';
attachPaginate();

let Connect = knex({
    client: 'mysql2',
    connection: {
        host : Config.databaseConnection,
        user : Config.databaseUser,
        port: Number(Config.databasePort),
        password : Config.databasePassword,
        database : Config.databaseDatabase,
        timezone: Config.databaseTimeZone
    }
});


export {Connect}