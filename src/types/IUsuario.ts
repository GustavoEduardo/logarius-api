import { z } from "zod";

// Types

export type IUsuario = z.infer<typeof Usuario>;

// inputSchemas

export const Usuario = z.object({
  usuario_id: z.string().optional(),
  nome: z.string().optional(),
  email: z.string(),
  login: z.string(),
  senha: z.string(),
  status: z.enum(["ativo", "inativo"]).optional(),
  confirmeSenha: z.string().optional(),
  perfis_de_acesso: z.array(z.string()).optional(),
  imagem: z.string().optional(),
  data_nascimento: z.string().optional(),
  cpf: z.string().optional(),
  telefone: z.string().optional(),
});

export const UsuarioEdit = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
  login: z.string().optional(),
  senha: z.string().optional(),
  status: z.enum(["ativo", "inativo"]).optional(),
  imagem: z.string().optional(),
  perfis_de_acesso: z.array(z.string()).optional(),
  data_nascimento: z.string().optional(),
  cpf: z.string().optional(),
  telefone: z.string().optional(),
});
