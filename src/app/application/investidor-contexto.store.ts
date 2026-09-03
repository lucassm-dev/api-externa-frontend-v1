import { computed, Injectable, signal } from '@angular/core';

/** Dados mínimos devolvidos pela listagem de investidores ativos. */
export interface InvestidorContexto {
  id: number;
  nome: string;
  email: string;
}

export const INVESTIDOR_CONTEXTO_STORAGE_KEY = 'fef-invest.investidor-contexto';

/**
 * Estado global do investidor escolhido no MVP.
 *
 * A lista recebida por `atualizarInvestidores` vem de `GET /investidores`, que só devolve
 * investidores ativos. Por isso ela é a fonte de verdade para revalidar o valor persistido.
 */
@Injectable({ providedIn: 'root' })
export class InvestidorContextoStore {
  readonly investidores = signal<readonly InvestidorContexto[]>([]);
  readonly contexto = signal<InvestidorContexto | null>(this.lerContextoPersistido());
  readonly investidorId = computed(() => this.contexto()?.id ?? null);

  /** Atualiza a lista que alimenta o seletor e revalida o contexto salvo contra seus ativos. */
  atualizarInvestidores(investidores: readonly InvestidorContexto[]): boolean {
    this.investidores.set([...investidores]);

    return this.revalidarContexto();
  }

  /** Define o investidor de contexto e o persiste para a próxima abertura da aplicação. */
  selecionar(investidor: InvestidorContexto): void {
    this.contexto.set(investidor);
    this.persistir(investidor);
  }

  /** Remove o contexto reativo e o valor salvo no navegador. */
  limpar(): void {
    this.contexto.set(null);
    this.obterStorage()?.removeItem(INVESTIDOR_CONTEXTO_STORAGE_KEY);
  }

  /**
   * Confirma que o contexto atual ainda existe na listagem de investidores ativos.
   * Retorna `true` somente quando há um contexto ativo após a revalidação.
   */
  revalidarContexto(): boolean {
    const contexto = this.contexto();

    if (!contexto) {
      return false;
    }

    const investidorAtivo = this.investidores().find(({ id }) => id === contexto.id);

    if (!investidorAtivo) {
      this.limpar();
      return false;
    }

    // Atualiza eventuais dados cadastrais alterados desde a última abertura.
    this.selecionar(investidorAtivo);
    return true;
  }

  private lerContextoPersistido(): InvestidorContexto | null {
    const valorPersistido = this.obterStorage()?.getItem(INVESTIDOR_CONTEXTO_STORAGE_KEY);

    if (!valorPersistido) {
      return null;
    }

    try {
      const candidato: unknown = JSON.parse(valorPersistido);

      if (this.ehInvestidorContexto(candidato)) {
        return candidato;
      }
    } catch {
      // Um valor inválido não pode impedir a abertura da aplicação.
    }

    this.obterStorage()?.removeItem(INVESTIDOR_CONTEXTO_STORAGE_KEY);
    return null;
  }

  private persistir(investidor: InvestidorContexto): void {
    this.obterStorage()?.setItem(INVESTIDOR_CONTEXTO_STORAGE_KEY, JSON.stringify(investidor));
  }

  private obterStorage(): Storage | null {
    try {
      return typeof localStorage === 'undefined' ? null : localStorage;
    } catch {
      return null;
    }
  }

  private ehInvestidorContexto(valor: unknown): valor is InvestidorContexto {
    if (typeof valor !== 'object' || valor === null) {
      return false;
    }

    const candidato = valor as Record<string, unknown>;
    return (
      typeof candidato['id'] === 'number' &&
      typeof candidato['nome'] === 'string' &&
      typeof candidato['email'] === 'string'
    );
  }
}
