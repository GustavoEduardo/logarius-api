import axios, { AxiosInstance } from "axios";
import BaseRepositories from "./BaseRepositories";
import { responseInterceptor } from "../../helpers/axios-interceptors";

class VendaRepositorie extends BaseRepositories {
  private api: AxiosInstance;

  constructor() {
    super("venda");

    this.api = axios.create({
      baseURL: process.env.BASE_API_MT,
      headers: {
        Authorization: process.env.TOKEN_MT,
      },
    });
    responseInterceptor(this.api);
  }
}

export default new VendaRepositorie();
