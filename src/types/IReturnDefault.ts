export interface IErrorReturn {
  status?: "error";
  message?: string | null;
  code?: number;
  result?: any;
}

export interface ISuccessReturn {
  status?: "success";
  message?: string | null;
  code?: number;
  result?: any;
}
