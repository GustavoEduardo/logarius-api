import { z } from "zod";

// Types

export type IPagamentosPorAno = z.infer<typeof PagamentosPorAno>;

// inputSchemas

const IObjDinamico = z.any();

const IValorPorMes = z.object({
  jan: z.number().optional().nullable(),
  fev: z.number().optional().nullable(),
  mar: z.number().optional().nullable(),
  abr: z.number().optional().nullable(),
  mai: z.number().optional().nullable(),
  jun: z.number().optional().nullable(),
  jul: z.number().optional().nullable(),
  ago: z.number().optional().nullable(),
  set: z.number().optional().nullable(),
  out: z.number().optional().nullable(),
  nov: z.number().optional().nullable(),
  dez: z.number().optional().nullable(),
});

const IMesObg = z.object({
  valor: z.number().optional().nullable(),
  url: z.string().optional().nullable(),
  tributoEmBranco: z.number(),
  dinamicos: z.array(IObjDinamico).optional().nullable(),
});

const IObgMesAMes = z.object({
  id: z.string(),
  nome: z.string(),
  jan: IMesObg,
  fev: IMesObg,
  mar: IMesObg,
  abr: IMesObg,
  mai: IMesObg,
  jun: IMesObg,
  jul: IMesObg,
  ago: IMesObg,
  set: IMesObg,
  out: IMesObg,
  nov: IMesObg,
  dez: IMesObg,
});

const IObrigacao = z.object({
  id: z.enum(["acessorias", "principais"]),
  label: z.string(),
  obrigacoes: z.array(IObgMesAMes),
});

const Tributo = z.object({
  obrigacoes: z.array(IObrigacao),
  totais: z.object({
    obrigacoesAcessorias: z
      .object({
        min: IValorPorMes,
        max: IValorPorMes,
        total: IValorPorMes,
      })
      .optional()
      .nullable(),
    obrigacoesPrincipais: IValorPorMes,
    pricipalAcessorias: IValorPorMes,
    minMax: IValorPorMes,
  }),
});

export const PagamentosPorAno = z.record(Tributo);
