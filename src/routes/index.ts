import { Router } from "express";
import { Request, Response } from "express";
import Upload from "./Upload.routes";
import LoginRoutes from "./Login.routes";
import UsuarioRoutes from "./Usuario.routes";
import ProdutoRoutes from "./Produto.routes";
import VendaRoutes from "./Venda.routes";
import MetodoPagamentoRoutes from "./MetodoPagamento.routes";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({ status: "true" });
});

routes.use(Upload);
routes.use(LoginRoutes);
routes.use(UsuarioRoutes);
routes.use(ProdutoRoutes);
routes.use(VendaRoutes);
routes.use(MetodoPagamentoRoutes);

export default routes;
