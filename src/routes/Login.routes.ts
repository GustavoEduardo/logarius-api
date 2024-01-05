
import { Router } from 'express';
import Controller from '../api/controllers/LoginController';

const routes = Router();
routes.post('/login', Controller.login);

export default routes;