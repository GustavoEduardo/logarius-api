import { Router } from "express";
import Controller from "../api/controllers/UsuarioController";
import auth from "../api/middlewares/auth";

const routes = Router();
routes.post("/usuario", auth, Controller.create);
routes.get("/usuario", auth, Controller.select);
routes.put("/usuario/:id", auth, Controller.update);
routes.delete("/usuario/:id", auth, Controller.delete);

export default routes;
