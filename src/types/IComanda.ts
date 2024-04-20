import { z } from "zod";

// Types

export type IComanda = z.infer<typeof Comanda>;

// inputSchemas

export const Comanda = z.object({
  comanda_id: z.string().optional(),
  cliente_id: z.string().optional(),
  venda_id: z.string().optional(),
  titulo: z.string(),
  observacao: z.string().optional(),
  status_comanda: z.string().optional(),
  created_at: z.string().optional()
});

export const ComandaEdit = z.object({
  comanda_id: z.string().optional(),
  cliente_id: z.string().optional(),
  venda_id: z.string().optional(),
  titulo: z.string(),
  observacao: z.string().optional(),
  status_comanda: z.string().optional(),
  created_at: z.string().optional(),
  apenasComanda: z.boolean().optional()
});
