import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { InvestidorContextoStore } from './investidor-contexto.store';
import { ApiError } from '../domain/models/api-error.model';
import { Page, PageQuery } from '../domain/models/page.model';
import { CriarInvestidor, Investidor } from '../domain/models/investidor.model';
import {
  INVESTIDOR_REPOSITORY,
  InvestidorRepository,
} from '../domain/ports/investidor-repository.port';

/**
 * Estado e operações da tela de investidores.
 *
 * A facade relê a página depois de uma escrita para que a lista reflita a resposta do
 * servidor, que é a fonte de verdade dos investidores ativos.
 */
@Injectable({ providedIn: 'root' })
export class InvestidoresFacade {
  private readonly repositorio = inject<InvestidorRepository>(INVESTIDOR_REPOSITORY);
  private readonly contextoStore = inject(InvestidorContextoStore);
  private readonly consulta = signal<PageQuery>({ page: 0 });

  readonly dados = signal<Page<Investidor> | null>(null);
  readonly carregando = signal(false);
  readonly erro = signal<ApiError | null>(null);
  readonly investidores = computed<readonly Investidor[]>(() => this.dados()?.content ?? []);
  readonly vazio = computed(() => this.dados()?.empty === true);

  /** Carrega uma página de investidores ativos e a repassa ao contexto global. */
  async carregar(consulta: PageQuery = this.consulta()): Promise<void> {
    this.consulta.set(consulta);
    this.carregando.set(true);
    this.erro.set(null);

    try {
      const pagina = await firstValueFrom(this.repositorio.listar(consulta));
      this.dados.set(pagina);
      this.contextoStore.atualizarInvestidores(pagina.content);
    } catch (erro: unknown) {
      this.erro.set(this.normalizarErro(erro));
    } finally {
      this.carregando.set(false);
    }
  }

  /** Cria o investidor e volta à primeira página para exibir o novo cadastro. */
  async criar(dados: CriarInvestidor): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      await firstValueFrom(this.repositorio.criar(dados));
      await this.carregar({ ...this.consulta(), page: 0 });
    } catch (erro: unknown) {
      this.erro.set(this.normalizarErro(erro));
    } finally {
      this.carregando.set(false);
    }
  }

  /** Exclui logicamente o investidor e relê a página que estava aberta. */
  async excluir(id: number): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      await firstValueFrom(this.repositorio.excluir(id));
      await this.carregar(this.consulta());
    } catch (erro: unknown) {
      this.erro.set(this.normalizarErro(erro));
    } finally {
      this.carregando.set(false);
    }
  }

  private normalizarErro(erro: unknown): ApiError {
    return erro instanceof ApiError
      ? erro
      : new ApiError(0, 'Não foi possível concluir a solicitação. Tente de novo.');
  }
}
