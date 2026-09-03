import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';

@Component({ imports: [RouterOutlet], template: '<router-outlet />' })
class RouterHostComponent {}

describe('rotas', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterHostComponent],
      providers: [provideRouter(routes)],
    });
    router = TestBed.inject(Router);
  });

  it('AC-002: A rota raiz leva ao dashboard @spec:AC-002', async () => {
    await router.navigateByUrl('/');

    expect(router.url).toBe('/dashboard');
  });

  it('AC-003: Endereço inexistente informa sem derrubar a navegação @spec:AC-003', async () => {
    const fixture = TestBed.createComponent(RouterHostComponent);
    fixture.detectChanges();

    await router.navigateByUrl('/endereco-inexistente');
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    const retorno = elemento.querySelector<HTMLAnchorElement>('a');

    expect(elemento.textContent).toContain('Página não encontrada');
    expect(retorno?.textContent).toContain('Voltar ao dashboard');
    expect(retorno?.getAttribute('href')).toBe('/dashboard');
  });
});
