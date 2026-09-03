import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InvestidoresFacade } from '../../../application/investidores.facade';
import {
  InvestidorContexto,
  InvestidorContextoStore,
} from '../../../application/investidor-contexto.store';
import { EstadoVazioComponent } from '../../../shared/components/estado-vazio/estado-vazio';
import { PaginadorComponent } from '../../../shared/components/paginador/paginador';
import { SkeletonTabelaComponent } from '../../../shared/components/skeleton-tabela/skeleton-tabela';

/** Lista os investidores ativos e permite definir o contexto de trabalho. */
@Component({
  selector: 'app-investidores-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EstadoVazioComponent, PaginadorComponent, SkeletonTabelaComponent],
  template: `
    <main aria-labelledby="titulo-investidores">
      <header class="page-header">
        <div>
          <p class="text-eyebrow">Configuração</p>
          <h1 id="titulo-investidores" class="text-h1">Investidores</h1>
          <p class="text-body">Escolha o investidor com que deseja trabalhar.</p>
        </div>
        <button class="button button--primary" type="button">Cadastrar investidor</button>
      </header>

      @if (facade.carregando()) {
        <app-skeleton-tabela [linhas]="5" [colunas]="3" />
      } @else if (facade.dados(); as pagina) {
        @if (pagina.empty) {
          <app-estado-vazio
            titulo="Nenhum investidor cadastrado"
            descricao="Cadastre o primeiro investidor para começar a montar carteiras."
            textoAcao="Cadastrar investidor"
          />
        } @else {
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col"><span class="sr-only">Ação</span></th>
                </tr>
              </thead>
              <tbody>
                @for (investidor of pagina.content; track investidor.id) {
                  <tr>
                    <td>{{ investidor.nome }}</td>
                    <td>{{ investidor.email }}</td>
                    <td class="investidores-page__acao">
                      <button class="button button--secondary" type="button" (click)="selecionar(investidor)">
                        Trabalhar com este investidor
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <app-paginador
            [paginaAtual]="pagina.number"
            [totalPaginas]="pagina.totalPages"
            (paginaAlterada)="facade.carregar({ page: $event })"
          />
        }
      }
    </main>
  `,
  styles: `
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .page-header h1,
    .page-header p {
      margin: 0;
    }

    .page-header .text-eyebrow {
      margin-bottom: var(--space-1);
    }

    .page-header .text-body {
      margin-top: var(--space-1);
      color: var(--text-muted);
    }

    .investidores-page__acao {
      width: 1%;
      white-space: nowrap;
      text-align: right;
    }
  `,
})
export class InvestidoresPageComponent {
  protected readonly facade = inject(InvestidoresFacade);
  private readonly contextoStore = inject(InvestidorContextoStore);

  constructor() {
    this.facade.carregar();
  }

  protected selecionar(investidor: InvestidorContexto): void {
    this.contextoStore.selecionar(investidor);
  }
}
