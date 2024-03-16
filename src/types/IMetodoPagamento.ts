import { z } from "zod";

// Types

export type IMetodoPagamento = z.infer<typeof MetodoPagamento>;

// inputSchemas

export const MetodoPagamento = z.object({
  metodo_pagamento_id: z.string().optional(),
  metodo: z.string()
});