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
  valor_final: z.number().optional(),
  status: z.string().optional(),
  status_pagamento: z.string().optional(),
  endereco_entrega: z.string().optional().nullable(),
  created_at: z.string().optional(),
  produtos: z.array(ProdutosToAdd).optional()
});

export const VendaEdit = z.object({
  cliente_id: z.string().optional(),
  metodo_pagamento_id: z.string().optional(),
  valor: z.number().optional(),
  valor_desconto: z.number().optional(),
  valor_final: z.number().optional(),
  endereco_entrega: z.string().optional(),
  status: z.string().optional(),
  status_pagamento: z.string().optional(),
  produtos: z.array(ProdutosToAdd).optional()
});
