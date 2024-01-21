import { Router } from "express";
import Controller from "../api/controllers/ProdutoController";
import auth from "../api/middlewares/auth";

const routes = Router();
routes.post("/produto", auth, Controller.create);
routes.get("/produto", auth, Controller.select);
routes.put("/produto/:id", auth, Controller.update);
routes.delete("/produto/:id", auth, Controller.delete);

export default routes;
