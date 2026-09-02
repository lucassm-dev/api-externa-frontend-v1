/** Espelha o `StandardError` devolvido pelo GlobalExceptionHandler do backend. */
export interface StandardError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
}

/** Erro normalizado que circula na aplicação — nunca um HttpErrorResponse cru. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    override readonly message: string,
    readonly fieldErrors: FieldError[] = [],
    readonly path?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  /** true quando a requisição não chegou ao backend (offline, DNS, CORS). */
  get isNetworkError(): boolean {
    return this.status === 0;
  }

  messageFor(field: string): string | undefined {
    return this.fieldErrors.find((e) => e.field === field)?.message;
  }
}
