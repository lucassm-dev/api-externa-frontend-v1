import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { NaoEncontradoComponent } from './presentation/features/nao-encontrado/nao-encontrado';

/**
 * As telas de cada domínio são entregues nas features correspondentes. Enquanto isso, as
 * rotas já são lazy para que o shell possa montar a área correta sem acoplar os domínios.
 */
@Component({ template: '' })
class PaginaPendenteComponent {}

const carregarPaginaPendente = () => Promise.resolve(PaginaPendenteComponent);

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard/aportes', loadComponent: carregarPaginaPendente },
  { path: 'dashboard', loadComponent: carregarPaginaPendente },
  { path: 'carteiras/:id', loadComponent: carregarPaginaPendente },
  { path: 'carteiras', loadComponent: carregarPaginaPendente },
  { path: 'movimentacoes', loadComponent: carregarPaginaPendente },
  { path: 'acoes', loadComponent: carregarPaginaPendente },
  { path: 'corretoras', loadComponent: carregarPaginaPendente },
  { path: 'investidores', loadComponent: carregarPaginaPendente },
  { path: '**', loadComponent: () => Promise.resolve(NaoEncontradoComponent) },
];
