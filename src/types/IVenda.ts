import { z } from "zod";

// Types

export type IVenda = z.infer<typeof Venda>;
export type IProdutosToAdd = z.infer<typeof ProdutosToAdd>;

// inputSchemas

export const ProdutosToAdd = z.object({
  produto_id: z.string(),
  valor: z.number(),
  quantidade: z.number()
});

export const Venda = z.object({
  venda_id: z.string().optional(),
  cliente_id: z.string(),
  metodo_pagamento_id: z.string(),
  valor: z.number(),
  valor_desconto: z.number(),
  valor_final: z.number(),
  status: z.string(),
  status_pagamento: z.string(),
  endereco_entrega: z.string(),
  created_at: z.string(),
  produtos: z.array(ProdutosToAdd).optional()
});

export const VendaEdit = z.object({
  cliente_id: z.string(),
  metodo_pagamento_id: z.string(),
  valor: z.number(),
  valor_desconto: z.number(),
  valor_final: z.number(),
  endereco_entrega: z.string(),
  produtos: z.array(ProdutosToAdd).optional()
});
