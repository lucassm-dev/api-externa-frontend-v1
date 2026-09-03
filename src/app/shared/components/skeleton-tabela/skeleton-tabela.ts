import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Mantém o espaço de uma tabela enquanto a consulta ainda está carregando. */
@Component({
  selector: 'app-skeleton-tabela',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="table-scroll" role="status" aria-live="polite" aria-label="Carregando tabela">
      <table class="data-table skeleton-tabela">
        <tbody>
          @for (linha of linhasArray; track $index) {
            <tr aria-hidden="true">
              @for (coluna of colunasArray; track $index) {
                <td [class.data-table__numeric]="ehColunaNumerica($index)" [class.num]="ehColunaNumerica($index)">
                  <span class="skeleton-tabela__bloco"></span>
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
      <span class="skeleton-tabela__texto">Carregando dados</span>
    </div>
  `,
  styles: `
    .skeleton-tabela__bloco {
      display: block;
      width: 100%;
      height: 16px;
      background: var(--border);
      border-radius: var(--radius-badge);
      animation: skeleton-tabela-pulse 1.5s ease-in-out infinite;
    }

    .skeleton-tabela__texto {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    @keyframes skeleton-tabela-pulse {
      0%,
      100% {
        opacity: 0.6;
      }

      50% {
        opacity: 1;
      }
    }
  `,
})
export class SkeletonTabelaComponent {
  /** Número de linhas reservadas; cinco reproduz o padrão do design system. */
  @Input() linhas = 5;
  /** Número de colunas da tabela que será exibida. */
  @Input() colunas = 1;
  /** Índices baseados em zero das colunas que representam números. */
  @Input() colunasNumericas: readonly number[] = [];

  get linhasArray(): undefined[] {
    return Array.from({ length: Math.max(1, this.linhas) });
  }

  get colunasArray(): undefined[] {
    return Array.from({ length: Math.max(1, this.colunas) });
  }

  protected ehColunaNumerica(indice: number): boolean {
    return this.colunasNumericas.includes(indice);
  }
}
