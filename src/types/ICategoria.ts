import { z } from "zod";

// Types

export type ICategoria = z.infer<typeof Categoria>;

// inputSchemas

const Categoria = z.object({
  categpria_id: z.string(),
  descricao: z.string(),
  created_at: z.string(),
  updated_a: z.string(),
});

export const Categorias = z.record(Categoria);
