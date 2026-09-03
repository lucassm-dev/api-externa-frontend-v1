import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'node:fs';
import { ApiError } from '../../domain/models/api-error.model';
import { CardErroComponent } from './card-erro/card-erro';
import { EstadoVazioComponent } from './estado-vazio/estado-vazio';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao';
import { PaginadorComponent } from './paginador/paginador';
import { SkeletonTabelaComponent } from './skeleton-tabela/skeleton-tabela';

const estilosDeVariacao = readFileSync('src/styles/_card.scss', 'utf8');

describe('componentes de estado', () => {
  it('AC-013: Colunas numéricas alinham na vertical @spec:AC-013', () => {
    const fixture = TestBed.createComponent(SkeletonTabelaComponent);
    fixture.componentRef.setInput('linhas', 2);
    fixture.componentRef.setInput('colunas', 3);
    fixture.componentRef.setInput('colunasNumericas', [2]);
    fixture.detectChanges();

    const linhas = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(linhas).toHaveLength(2);
    for (const linha of linhas) {
      const celulas = linha.querySelectorAll('td');
      expect(celulas[2].classList).toContain('data-table__numeric');
      expect(celulas[2].classList).toContain('num');
    }
  });

  it('AC-012: Falha de serviço externo oferece tentar de novo @spec:AC-012', () => {
    const fixture = TestBed.createComponent(CardErroComponent);
    const tentarNovamente = vi.fn();
    fixture.componentRef.setInput(
      'erro',
      new ApiError(502, 'Não foi possível consultar a fonte externa agora. Tente de novo.'),
    );
    fixture.componentInstance.tentarNovamente.subscribe(tentarNovamente);
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    expect(elemento.textContent).toContain('fonte externa');
    const botao = Array.from(elemento.querySelectorAll('button')).find(
      (item) => item.textContent?.trim() === 'Tentar de novo',
    ) as HTMLButtonElement;
    expect(botao).toBeTruthy();
    botao.click();
    expect(tentarNovamente).toHaveBeenCalledOnce();
  });

  it('AC-014: Variação nunca é comunicada só por cor @spec:AC-014', () => {
    expect(estilosDeVariacao).toMatch(
      /\.variation--up\s*\{[^}]*color:\s*var\(--up\);[\s\S]*?&::before\s*\{\s*content:\s*'↑';/,
    );
    expect(estilosDeVariacao).toMatch(
      /\.variation--down\s*\{[^}]*color:\s*var\(--down\);[\s\S]*?&::before\s*\{\s*content:\s*'↓';/,
    );
  });

  it('AC-015: Todo controle mostra o foco de teclado @spec:AC-015', () => {
    const fixture = TestBed.createComponent(EstadoVazioComponent);
    fixture.componentRef.setInput('titulo', 'Nenhuma carteira');
    fixture.componentRef.setInput('descricao', 'Crie sua primeira carteira para começar.');
    fixture.componentRef.setInput('textoAcao', 'Criar carteira');
    fixture.detectChanges();

    const botao = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(botao).toBeTruthy();
    expect(botao.classList).toContain('button');
    expect(botao.tabIndex).toBe(0);
  });

  it('fornece navegação paginada e confirmação de ações irreversíveis', () => {
    const paginador = TestBed.createComponent(PaginadorComponent);
    paginador.componentRef.setInput('paginaAtual', 1);
    paginador.componentRef.setInput('totalPaginas', 3);
    const paginaAlterada = vi.fn();
    paginador.componentInstance.paginaAlterada.subscribe(paginaAlterada);
    paginador.detectChanges();

    const botoesPaginador = paginador.nativeElement.querySelectorAll('button');
    (botoesPaginador[1] as HTMLButtonElement).click();
    expect(paginaAlterada).toHaveBeenCalledWith(2);

    const modal = TestBed.createComponent(ModalConfirmacaoComponent);
    modal.componentRef.setInput('aberto', true);
    modal.componentRef.setInput('titulo', 'Excluir carteira');
    modal.componentRef.setInput('mensagem', 'Esta ação não pode ser desfeita.');
    const confirmar = vi.fn();
    modal.componentInstance.confirmar.subscribe(confirmar);
    modal.detectChanges();

    const dialogo = modal.nativeElement.querySelector('[role="dialog"]');
    expect(dialogo?.getAttribute('aria-modal')).toBe('true');
    (modal.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement).click();
    expect(confirmar).toHaveBeenCalledOnce();
  });
});
