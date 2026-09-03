import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError, StandardError } from '../../domain/models/api-error.model';

const MENSAGEM_REDE = 'Não foi possível falar com o servidor. Verifique se o backend está no ar.';
const MENSAGEM_PADRAO = 'Não foi possível concluir a solicitação. Tente de novo.';
const MENSAGEM_FONTE_EXTERNA =
  'Não foi possível consultar a fonte externa agora. Tente de novo.';

function temMensagem(corpo: Partial<StandardError>): corpo is StandardError {
  return typeof corpo.message === 'string' && corpo.message.trim().length > 0;
}

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (erro.status === 0) {
        return throwError(() => new ApiError(0, MENSAGEM_REDE, [], undefined, true));
      }

      if (erro.status === 502) {
        return throwError(() => new ApiError(502, MENSAGEM_FONTE_EXTERNA, [], undefined, true));
      }

      const corpo = erro.error as Partial<StandardError> | string | null;

      if (typeof corpo === 'object' && corpo !== null && temMensagem(corpo)) {
        return throwError(
          () => new ApiError(erro.status, corpo.message, corpo.fieldErrors ?? [], corpo.path),
        );
      }

      return throwError(() => new ApiError(erro.status, MENSAGEM_PADRAO));
    }),
  );
