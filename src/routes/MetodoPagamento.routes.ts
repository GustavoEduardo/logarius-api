import { Router } from "express";
import Controller from "../api/controllers/MetodoPagamentoController";
import auth from "../api/middlewares/auth";

const routes = Router();
routes.post("/metodo-pagamento", auth, Controller.create);
routes.get("/metodo-pagamento", auth, Controller.select);

export default routes;
