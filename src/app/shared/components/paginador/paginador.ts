import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/** Navegação para páginas indexadas em zero, como a paginação do Spring. */
@Component({
  selector: 'app-paginador',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (totalPaginas > 1) {
      <nav class="paginador" aria-label="Paginação">
        <button class="button button--secondary" type="button" [disabled]="naPrimeiraPagina" (click)="irPara(paginaAtual - 1)">
          Anterior
        </button>
        <span class="text-body" aria-live="polite">Página {{ paginaAtual + 1 }} de {{ totalPaginas }}</span>
        <button class="button button--secondary" type="button" [disabled]="naUltimaPagina" (click)="irPara(paginaAtual + 1)">
          Próxima
        </button>
      </nav>
    }
  `,
  styles: `
    .paginador {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--space-2);
      margin-top: var(--space-3);
    }

    .paginador span {
      color: var(--text-muted);
    }
  `,
})
export class PaginadorComponent {
  @Input() paginaAtual = 0;
  @Input() totalPaginas = 0;
  @Output() readonly paginaAlterada = new EventEmitter<number>();

  get naPrimeiraPagina(): boolean {
    return this.paginaAtual <= 0;
  }

  get naUltimaPagina(): boolean {
    return this.totalPaginas === 0 || this.paginaAtual >= this.totalPaginas - 1;
  }

  protected irPara(pagina: number): void {
    if (pagina >= 0 && pagina < this.totalPaginas && pagina !== this.paginaAtual) {
      this.paginaAlterada.emit(pagina);
    }
  }
}
