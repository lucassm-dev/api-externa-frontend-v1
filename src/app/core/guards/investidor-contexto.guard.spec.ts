import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterOutlet, Routes, provideRouter } from '@angular/router';
import { InvestidorContextoStore } from '../../application/investidor-contexto.store';
import { investidorContextoGuard } from './investidor-contexto.guard';

@Component({ imports: [RouterOutlet], template: '<router-outlet />' })
class RouterHostComponent {}

@Component({ template: '' })
class PaginaComponent {}

describe('investidor-contexto.guard', () => {
  let router: Router;
  let store: InvestidorContextoStore;
  let carregamentosDependentes: number;

  beforeEach(() => {
    carregamentosDependentes = 0;
    const carregarAreaDependente = () => {
      carregamentosDependentes += 1;
      return Promise.resolve(PaginaComponent);
    };

    const rotas: Routes = [
      {
        path: 'dashboard',
        canMatch: [investidorContextoGuard],
        loadComponent: carregarAreaDependente,
      },
      {
        path: 'carteiras',
        canMatch: [investidorContextoGuard],
        loadComponent: carregarAreaDependente,
      },
      {
        path: 'movimentacoes',
        canMatch: [investidorContextoGuard],
        loadComponent: carregarAreaDependente,
      },
      { path: 'acoes', loadComponent: () => Promise.resolve(PaginaComponent) },
      { path: 'corretoras', loadComponent: () => Promise.resolve(PaginaComponent) },
      { path: 'investidores', loadComponent: () => Promise.resolve(PaginaComponent) },
    ];

    TestBed.configureTestingModule({
      imports: [RouterHostComponent],
      providers: [provideRouter(rotas)],
    });
    router = TestBed.inject(Router);
    store = TestBed.inject(InvestidorContextoStore);
    store.limpar();

    TestBed.createComponent(RouterHostComponent).detectChanges();
  });

  it('AC-007: Áreas que dependem de investidor exigem contexto @spec:AC-007', async () => {
    for (const areaDependente of ['dashboard', 'carteiras', 'movimentacoes']) {
      await router.navigateByUrl(`/${areaDependente}`);

      expect(router.url).toBe('/investidores');
    }

    expect(carregamentosDependentes).toBe(0);
  });

  it('AC-008: Catálogos continuam acessíveis sem contexto @spec:AC-008', async () => {
    for (const catalogo of ['acoes', 'corretoras', 'investidores']) {
      await router.navigateByUrl(`/${catalogo}`);

      expect(router.url).toBe(`/${catalogo}`);
    }
  });
});
