
import { Router } from 'express';
import Controller from '../api/controllers/ProdutoController'

const routes = Router();
routes.post('/produto', Controller.create);
routes.get('/produto', Controller.select);
routes.put('/produto/:id', Controller.update);
routes.delete('/produto/:id', Controller.delete);


export default routes;