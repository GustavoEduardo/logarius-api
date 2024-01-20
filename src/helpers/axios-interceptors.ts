
import { AxiosInstance, AxiosResponse } from "axios";
import { ZodSchema } from "zod";

declare module "axios" {
  export interface AxiosRequestConfig {
    inputSchema?: ZodSchema;
  }
}

export function responseInterceptor(axiosInstance: AxiosInstance) {
  function interceptor(res: AxiosResponse) {
    const inputSchema = res.config.inputSchema;
    if (inputSchema){

      try{
        res.data = inputSchema.parse(res.data);
      }catch(err: any){
        console.log('\n!!!!!! Erro de rotorno API Parceiro !!!!!!');
        throw(err);
      }

    }
    return res;
  }

  axiosInstance.interceptors.response.use(interceptor)
}