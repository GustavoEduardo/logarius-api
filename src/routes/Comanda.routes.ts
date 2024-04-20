import { Router } from "express";
import Controller from "../api/controllers/ComandaController";
import auth from "../api/middlewares/auth";

const routes = Router();
routes.post("/comanda", auth, Controller.create);
routes.get("/comanda", auth, Controller.select);
routes.put("/comanda/:id", auth, Controller.update);
routes.delete("/comanda/:id", auth, Controller.delete);

export default routes;
