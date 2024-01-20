import { z } from "zod";

// Types

export type IProduto = z.infer<typeof Produto>;

// inputSchemas

const Produto = z.object({
  produto_id: z.string(),
  codigo_barras: z.string(),
  nome: z.string(),
  descricao: z.string(),
  preco: z.number(),
  quantidade_estoque: z.number(),
  categoria_id: z.string(),
  fornecedor_id: z.string(),
  marca_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const Produtos = z.record(Produto);
