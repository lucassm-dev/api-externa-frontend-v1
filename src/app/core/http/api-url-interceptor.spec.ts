import { HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { filter, firstValueFrom, map, of } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { apiUrlInterceptor } from './api-url-interceptor';

describe('apiUrlInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: API_BASE_URL, useValue: '/api/' }],
    });
  });

  async function urlDepoisDoInterceptor(url: string): Promise<string> {
    const request = new HttpRequest('GET', url);
    const response = await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        apiUrlInterceptor(request, (next) => of(new HttpResponse({ body: next.url }))),
      ).pipe(
        filter((event): event is HttpResponse<string> => event instanceof HttpResponse),
        map((event) => event.body!),
      ),
    );

    return response;
  }

  it('prefixa caminhos de recursos com a base da API', async () => {
    await expect(urlDepoisDoInterceptor('/corretoras')).resolves.toBe('/api/corretoras');
    await expect(urlDepoisDoInterceptor('investidores')).resolves.toBe('/api/investidores');
  });

  it('não altera URLs absolutas, assets locais nem URL já prefixada', async () => {
    await expect(urlDepoisDoInterceptor('https://fonte.externa.test/cotacoes')).resolves.toBe(
      'https://fonte.externa.test/cotacoes',
    );
    await expect(urlDepoisDoInterceptor('/assets/logo.svg')).resolves.toBe('/assets/logo.svg');
    await expect(urlDepoisDoInterceptor('/api/carteiras')).resolves.toBe('/api/carteiras');
  });
});
