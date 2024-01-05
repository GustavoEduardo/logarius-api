
import { Router } from 'express';
import Controller from '../api/controllers/UsuarioController'

const routes = Router();
routes.post('/usuario', Controller.create);
routes.get('/usuario', Controller.select);
routes.get('/usuario/:id', Controller.getById);
routes.put('/usuario/:id', Controller.update);
routes.delete('/usuario/:id', Controller.delete);



export default routes;