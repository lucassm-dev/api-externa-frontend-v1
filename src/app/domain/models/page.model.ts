/** Espelha o `org.springframework.data.domain.Page` serializado pelo backend. */
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

/** Parâmetros aceitos pelo `Pageable` do Spring. */
export interface PageQuery {
  page?: number;
  size?: number;
  /** Ex.: `nome,asc` */
  sort?: string | string[];
}
