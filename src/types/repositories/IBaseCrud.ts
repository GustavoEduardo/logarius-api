export interface IGet {
  filtros?: any | object;
  campos?: string;
  raw?: string;
  rawType?: string;
}

export interface IInsert {
  data: any | object;
}

export interface IUpdate {
  data?: any | object;
  condicao?: any | object;
  raw?: string;
  set_data?: boolean;
}

export interface IDelete {
  condicao: any | object;
}
