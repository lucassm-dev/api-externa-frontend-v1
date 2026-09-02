import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError, StandardError } from '../../domain/models/api-error.model';

const MENSAGEM_REDE = 'Não foi possível falar com o servidor. Verifique se o backend está no ar.';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (erro.status === 0) {
        return throwError(() => new ApiError(0, MENSAGEM_REDE));
      }

      const corpo = erro.error as Partial<StandardError> | string | null;

      if (typeof corpo === 'object' && corpo !== null && typeof corpo.message === 'string') {
        return throwError(
          () => new ApiError(erro.status, corpo.message!, corpo.fieldErrors ?? [], corpo.path),
        );
      }

      return throwError(() => new ApiError(erro.status, erro.message));
    }),
  );
