import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { ShellComponent } from './shell';

@Component({ template: '' })
class PaginaComponent {}

const rotas = [
  { path: 'dashboard', component: PaginaComponent },
  { path: 'dashboard/aportes', component: PaginaComponent },
  { path: 'carteiras', component: PaginaComponent },
  { path: 'movimentacoes', component: PaginaComponent },
  { path: 'acoes', component: PaginaComponent },
  { path: 'corretoras', component: PaginaComponent },
  { path: 'investidores', component: PaginaComponent },
];

describe('shell', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShellComponent, RouterOutlet],
      providers: [provideRouter(rotas)],
    });
    router = TestBed.inject(Router);
  });

  it('AC-001: A navegação lista as áreas e destaca a atual @spec:AC-001', async () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    await router.navigateByUrl('/dashboard/aportes');
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    const navegacao = Array.from(elemento.querySelectorAll<HTMLAnchorElement>('.nav-link'));
    const linkPorTexto = (texto: string) =>
      navegacao.find((link) => link.textContent?.trim() === texto);

    for (const area of [
      'Dashboard',
      'Carteiras',
      'Movimentações',
      'Ações',
      'Corretoras',
      'Investidores',
    ]) {
      expect(linkPorTexto(area)).toBeTruthy();
    }

    expect(linkPorTexto('Dashboard')?.classList).toContain('is-active');
    expect(linkPorTexto('Aportes')?.classList).toContain('is-active');
    expect(linkPorTexto('Consolidado')?.classList).not.toContain('is-active');
  });
});
