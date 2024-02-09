import { Router } from "express";
import Controller from "../api/controllers/VendaController";
import auth from "../api/middlewares/auth";

const routes = Router();
routes.post("/venda", auth, Controller.create);
routes.get("/venda", auth, Controller.select);
routes.put("/venda/:id", auth, Controller.update);
routes.delete("/venda/:id", auth, Controller.delete);

export default routes;
