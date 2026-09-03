import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { ApiError } from '../../domain/models/api-error.model';
import { httpErrorInterceptor } from './http-error-interceptor';

async function interceptarErro(erro: HttpErrorResponse): Promise<ApiError> {
  const requisicao = new HttpRequest('POST', '/recurso', null);

  try {
    await firstValueFrom(httpErrorInterceptor(requisicao, () => throwError(() => erro)));
    throw new Error('O interceptor deveria propagar um ApiError.');
  } catch (erroInterceptado) {
    expect(erroInterceptado).toBeInstanceOf(ApiError);
    return erroInterceptado as ApiError;
  }
}

describe('http-error-interceptor', () => {
  it('AC-010: Erro de validação vira mensagem no campo @spec:AC-010', async () => {
    const erro = await interceptarErro(
      new HttpErrorResponse({
        status: 400,
        error: {
          message: 'Dados inválidos.',
          path: '/investidores',
          fieldErrors: [
            { field: 'email', message: 'Informe um e-mail válido.' },
            { field: 'cpf', message: 'CPF inválido.' },
          ],
        },
      }),
    );

    expect(erro.messageFor('email')).toBe('Informe um e-mail válido.');
    expect(erro.messageFor('cpf')).toBe('CPF inválido.');
    expect(erro.path).toBe('/investidores');
  });

  it('AC-011: Erro sem mensagem tem texto compreensível @spec:AC-011', async () => {
    const erro = await interceptarErro(
      new HttpErrorResponse({
        status: 400,
        error: {
          timestamp: '2026-09-03T12:00:00Z',
          status: 400,
          error: 'Bad Request',
          path: '/investidores?size=abc',
        },
      }),
    );

    expect(erro.message).toBe('Não foi possível concluir a solicitação. Tente de novo.');
    expect(erro.message).not.toContain('Http failure response');
    expect(erro.message).not.toContain('/investidores?size=abc');
  });

  it('AC-012: Falha de serviço externo oferece tentar de novo @spec:AC-012', async () => {
    const erro = await interceptarErro(
      new HttpErrorResponse({
        status: 502,
        error: { message: 'Limite da API externa atingido.' },
      }),
    );

    expect(erro.isExternalServiceError).toBe(true);
    expect(erro.canRetry).toBe(true);
    expect(erro.message).toContain('fonte externa');
    expect(erro.message).toContain('Tente de novo');
  });
});
