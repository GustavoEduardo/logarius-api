import { Router } from 'express';
import Upload from './Upload.routes'
import LoginRoutes from './Login.routes';
import UsuarioRoutes from './Usuario.routes';
import {  Request, Response } from 'express';

const routes = Router();

routes.get('/', async (req:Request,res:Response)=>{       

    return res.status(200).json({status: 'true'});
  
});


routes.use(Upload);
routes.use(LoginRoutes);
routes.use(UsuarioRoutes);

export default routes;

