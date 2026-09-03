import { CotacaoComMercado, CotacaoFrescor, LIMITE_DEFASAGEM_EM_MINUTOS } from './cotacao-frescor';

const agora = new Date('2026-09-03T15:00:00.000Z');

function cotacao(mercado: CotacaoComMercado['mercado'], minutosAtras: number): CotacaoComMercado {
  return {
    mercado,
    dataHoraCotacao: new Date(agora.getTime() - minutosAtras * 60 * 1000),
  };
}

describe('cotacao-frescor', () => {
  const frescor = new CotacaoFrescor();

  it('AC-044: Cotação além do limiar do mercado é sinalizada @spec:AC-044', () => {
    expect(LIMITE_DEFASAGEM_EM_MINUTOS).toEqual({ BR: 30, US: 5 });
    expect(frescor.estaDefasada(cotacao('BR', 30), agora)).toBe(false);
    expect(frescor.estaDefasada(cotacao('BR', 31), agora)).toBe(true);
    expect(frescor.estaDefasada(cotacao('US', 5), agora)).toBe(false);
    expect(frescor.estaDefasada(cotacao('US', 6), agora)).toBe(true);
  });

  it('AC-045: Defasagem geral vira um aviso só, não um por linha @spec:AC-045', () => {
    const cotacoes = [cotacao('BR', 31), cotacao('US', 6)];

    expect(frescor.todasDefasadas(cotacoes, agora)).toBe(true);
    expect(frescor.deveExibirAvisoNaLinha(cotacoes[0], cotacoes, agora)).toBe(false);
    expect(frescor.deveExibirAvisoNaLinha(cotacoes[1], cotacoes, agora)).toBe(false);
  });

  it('AC-073: Cotação defasada é sinalizada na linha @spec:AC-073', () => {
    const cotacaoDefasada = cotacao('BR', 31);
    const cotacoes = [cotacaoDefasada, cotacao('US', 4)];

    expect(frescor.deveExibirAvisoNaLinha(cotacaoDefasada, cotacoes, agora)).toBe(true);
    expect(frescor.deveExibirAvisoNaLinha(cotacoes[1], cotacoes, agora)).toBe(false);
  });

  it('AC-104: Nenhum número aparece sem o horário da cotação que o gerou @spec:AC-104', () => {
    const maisAntiga = cotacao('BR', 20);
    const maisNova = cotacao('BR', 3);

    expect(frescor.cotacaoMaisAntiga([maisNova, maisAntiga])).toBe(maisAntiga);
    expect(frescor.cotacaoMaisAntiga([])).toBeNull();
  });

  it('AC-105: Consolidado com cotação defasada é sinalizado @spec:AC-105', () => {
    const maisAntiga = cotacao('US', 6);
    const maisNova = cotacao('US', 2);
    const referenciaDoConsolidado = frescor.cotacaoMaisAntiga([maisNova, maisAntiga]);

    expect(referenciaDoConsolidado).toBe(maisAntiga);
    expect(frescor.estaDefasada(referenciaDoConsolidado!, agora)).toBe(true);
  });
});
