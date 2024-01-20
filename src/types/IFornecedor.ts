import { z } from "zod";

// Types

export type IFornecedor = z.infer<typeof Fornecedor>;

// inputSchemas

const Fornecedor = z.object({
  fornecedor_id: z.string(),
  nome: z.string(),
  cnpj: z.string(),
  created_at: z.string(),
  updated_a: z.string(),
});

export const Fornecedores = z.record(Fornecedor);
