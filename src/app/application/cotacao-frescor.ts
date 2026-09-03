import { Injectable } from '@angular/core';
import { Mercado } from '../domain/enums/mercado.enum';

/** A cotação e o mercado necessários para avaliar o atraso da fonte. */
export interface CotacaoComMercado {
  mercado: Mercado;
  dataHoraCotacao: Date;
}

export const LIMITE_DEFASAGEM_EM_MINUTOS: Readonly<Record<Mercado, number>> = {
  BR: 30,
  US: 5,
};

/**
 * Centraliza a regra de frescor de cotação.
 *
 * Os consumidores recebem `dataHoraCotacao` já normalizada para `Date` pelo repositório e
 * recalculam este resultado sempre que exibem os dados; defasagem não é estado persistido.
 */
@Injectable({ providedIn: 'root' })
export class CotacaoFrescor {
  estaDefasada(cotacao: CotacaoComMercado, agora: Date = new Date()): boolean {
    const obtidaEm = cotacao.dataHoraCotacao.getTime();
    const momentoAtual = agora.getTime();

    if (Number.isNaN(obtidaEm) || Number.isNaN(momentoAtual)) {
      return false;
    }

    const limiteEmMilissegundos = LIMITE_DEFASAGEM_EM_MINUTOS[cotacao.mercado] * 60 * 1000;
    return momentoAtual - obtidaEm > limiteEmMilissegundos;
  }

  /** Retorna falso para uma lista vazia: sem cotações não há aviso geral a exibir. */
  todasDefasadas(cotacoes: readonly CotacaoComMercado[], agora: Date = new Date()): boolean {
    return cotacoes.length > 0 && cotacoes.every((cotacao) => this.estaDefasada(cotacao, agora));
  }

  /**
   * Evita repetir o mesmo alerta: a linha só recebe badge quando o atraso é uma exceção dela.
   */
  deveExibirAvisoNaLinha(
    cotacao: CotacaoComMercado,
    cotacoesExibidas: readonly CotacaoComMercado[],
    agora: Date = new Date(),
  ): boolean {
    return this.estaDefasada(cotacao, agora) && !this.todasDefasadas(cotacoesExibidas, agora);
  }

  /** A cotação mais antiga é a referência de horário e de atraso de um consolidado. */
  cotacaoMaisAntiga(cotacoes: readonly CotacaoComMercado[]): CotacaoComMercado | null {
    return cotacoes.reduce<CotacaoComMercado | null>((maisAntiga, cotacao) => {
      if (!maisAntiga || cotacao.dataHoraCotacao.getTime() < maisAntiga.dataHoraCotacao.getTime()) {
        return cotacao;
      }

      return maisAntiga;
    }, null);
  }
}
