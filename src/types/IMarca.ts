import { z } from "zod";

// Types

export type IMarca = z.infer<typeof Marca>;

// inputSchemas

const Marca = z.object({
  marca_id: z.string(),
  descricao: z.string(),
  created_at: z.string(),
  updated_a: z.string(),
});

export const Marcas = z.record(Marca);
