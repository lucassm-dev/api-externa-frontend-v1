import { computed } from '@angular/core';
import { afterEach, beforeEach, vi } from 'vitest';
import {
  INVESTIDOR_CONTEXTO_STORAGE_KEY,
  InvestidorContexto,
  InvestidorContextoStore,
} from './investidor-contexto.store';

const investidores: InvestidorContexto[] = [
  { id: 1, nome: 'Ana Silva', email: 'ana@example.com' },
  { id: 2, nome: 'Bruno Lima', email: 'bruno@example.com' },
];

function criarStorage(): Storage {
  const valores = new Map<string, string>();

  return {
    get length() {
      return valores.size;
    },
    clear: () => valores.clear(),
    getItem: (chave) => valores.get(chave) ?? null,
    key: (indice) => [...valores.keys()][indice] ?? null,
    removeItem: (chave) => valores.delete(chave),
    setItem: (chave, valor) => valores.set(chave, valor),
  };
}

describe('investidor-contexto.store', () => {
  beforeEach(() => vi.stubGlobal('localStorage', criarStorage()));
  afterEach(() => vi.unstubAllGlobals());

  it('AC-004: O seletor lista os investidores e define o contexto @spec:AC-004', () => {
    const store = new InvestidorContextoStore();

    store.atualizarInvestidores(investidores);
    store.selecionar(investidores[1]);

    expect(store.investidores()).toEqual(investidores);
    expect(store.contexto()).toEqual(investidores[1]);
    expect(store.investidorId()).toBe(2);
  });

  it('AC-005: O contexto sobrevive ao recarregamento da página @spec:AC-005', () => {
    const antesDoRecarregamento = new InvestidorContextoStore();
    antesDoRecarregamento.selecionar(investidores[0]);

    const depoisDoRecarregamento = new InvestidorContextoStore();

    expect(depoisDoRecarregamento.contexto()).toEqual(investidores[0]);
    expect(depoisDoRecarregamento.investidorId()).toBe(1);
  });

  it('AC-006: Contexto de investidor excluído não persiste @spec:AC-006', () => {
    localStorage.setItem(INVESTIDOR_CONTEXTO_STORAGE_KEY, JSON.stringify(investidores[0]));
    const store = new InvestidorContextoStore();

    const contextoPermaneceAtivo = store.atualizarInvestidores([investidores[1]]);

    expect(contextoPermaneceAtivo).toBe(false);
    expect(store.contexto()).toBeNull();
    expect(localStorage.getItem(INVESTIDOR_CONTEXTO_STORAGE_KEY)).toBeNull();
  });

  it('AC-009: Trocar de investidor troca os dados exibidos @spec:AC-009', () => {
    const store = new InvestidorContextoStore();
    store.selecionar(investidores[0]);
    const dadosDaAreaDependente = computed(() => {
      const investidorId = store.investidorId();
      return investidorId === null ? [] : [`dados-do-investidor-${investidorId}`];
    });

    expect(dadosDaAreaDependente()).toEqual(['dados-do-investidor-1']);

    store.selecionar(investidores[1]);

    expect(dadosDaAreaDependente()).toEqual(['dados-do-investidor-2']);
    expect(dadosDaAreaDependente()).not.toContain('dados-do-investidor-1');
  });
});
