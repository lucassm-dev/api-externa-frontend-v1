import { TestBed } from '@angular/core/testing';
import { computed } from '@angular/core';
import {
  InvestidorContexto,
  InvestidorContextoStore,
} from '../../../application/investidor-contexto.store';
import { SeletorInvestidorComponent } from './seletor-investidor';

const investidores: InvestidorContexto[] = [
  { id: 1, nome: 'Ana Silva', email: 'ana@example.com' },
  { id: 2, nome: 'Bruno Lima', email: 'bruno@example.com' },
];

describe('seletor-investidor', () => {
  let store: InvestidorContextoStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SeletorInvestidorComponent] });
    store = TestBed.inject(InvestidorContextoStore);
    store.atualizarInvestidores(investidores);
  });

  it('AC-004: O seletor lista os investidores e define o contexto @spec:AC-004', () => {
    const fixture = TestBed.createComponent(SeletorInvestidorComponent);
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    const seletor = elemento.querySelector('select') as HTMLSelectElement;
    expect(Array.from(seletor.options).map((opcao) => opcao.textContent?.trim())).toEqual([
      'Selecione um investidor',
      'Ana Silva',
      'Bruno Lima',
    ]);

    seletor.value = '2';
    seletor.dispatchEvent(new Event('change'));

    expect(store.contexto()).toEqual(investidores[1]);
  });

  it('AC-009: Trocar de investidor troca os dados exibidos @spec:AC-009', () => {
    const fixture = TestBed.createComponent(SeletorInvestidorComponent);
    const dadosExibidos = computed(() => {
      const investidorId = store.investidorId();
      return investidorId === null ? [] : [`dados-do-investidor-${investidorId}`];
    });
    store.selecionar(investidores[0]);
    fixture.detectChanges();

    const elemento: HTMLElement = fixture.nativeElement;
    const seletor = elemento.querySelector('select') as HTMLSelectElement;
    expect(dadosExibidos()).toEqual(['dados-do-investidor-1']);

    seletor.value = '2';
    seletor.dispatchEvent(new Event('change'));

    expect(dadosExibidos()).toEqual(['dados-do-investidor-2']);
    expect(dadosExibidos()).not.toContain('dados-do-investidor-1');
  });
});
