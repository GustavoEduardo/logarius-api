import { Knex, QueryBuilder } from "knex";

export function validateInput(input: any, type: any) {
  try {
    return type.parse(input);
  } catch (error: any) {
    throw { error, message: "Campos recebidos inválidos!" };
  }
}

export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/;
  return email.match(emailRegex);
}

export function whereQuery(query: any, filtros: any, ponteiro?: string){
  Object.entries(filtros).forEach((f: any) => {
    if (
      !["ordem", "tipo_ordem", "currentPage", "perPage", "pesquisa"].includes(
        f[0]
      )
    ) {
      ponteiro ? query.andWhere(`${ponteiro}.${f[0]}`, f[1]) : query.andWhere(`.${f[0]}`, f[1]);;
    }
  });

  return query;
}
