import { z } from "zod";

// Types

export type ILogin = z.infer<typeof Login>;

// inputSchemas

export const Login = z.object({
  login: z.string(),
  senha: z.string()
});
