import { z } from "zod";

// Types

export type IProduto = z.infer<typeof Produto>;

// inputSchemas

export const Produto = z.object({
  produto_id: z.string().optional(),
  codigo_barras: z.string().optional(),
  nome: z.string(),
  descricao: z.string(),
  preco: z.number(),
  quantidade_estoque: z.number(),
  categoria_id: z.string(),
  fornecedor_id: z.string(),
  marca_id: z.string()
});

export const ProdutoEdit = z.object({
  codigo_barras: z.string().optional(),
  nome: z.string().optional(),
  descricao: z.string().optional(),
  preco: z.number().optional(),
  quantidade_estoque: z.number().optional(),
  categoria_id: z.string().optional(),
  fornecedor_id: z.string().optional(),
  marca_id: z.string().optional()
});
