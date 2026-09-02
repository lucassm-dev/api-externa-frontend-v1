// T-010 — Componentes compartilhados de estado e navegação. Testes-esqueleto de
// `onp-spec scaffold`: FALHAM até serem implementados.
//
// AC-013, AC-014 e AC-015 são regras do design system. Um teste unitário não computa CSS
// de folha externa, então cada um prova o CONTRATO observável no DOM — a classe numérica
// aplicada, o sinal textual junto da cor, o elemento focável — e não o pixel renderizado.

describe('componentes de estado', () => {
  it('AC-013: Colunas numéricas alinham na vertical @spec:AC-013', () => {
    // Dado: uma tabela com valores de tamanhos diferentes na mesma coluna
    // Quando: a coluna é renderizada
    // Então: as células numéricas carregam a classe de numeral tabular e o alinhamento à
    //        direita, que é o que produz o alinhamento do separador decimal
    throw new Error('AC-013 ainda não provado — implemente este teste');
  });

  it('AC-014: Variação nunca é comunicada só por cor @spec:AC-014', () => {
    // Dado: um valor que representa alta ou baixa
    // Quando: ele é exibido
    // Então: além da cor há um sinal ou rótulo textual indicando a direção
    throw new Error('AC-014 ainda não provado — implemente este teste');
  });

  it('AC-015: Todo controle mostra o foco de teclado @spec:AC-015', () => {
    // Dado: que navego usando apenas o teclado
    // Quando: o foco chega a um botão, campo ou link
    // Então: o elemento é focável e recebe o anel de foco do design system
    throw new Error('AC-015 ainda não provado — implemente este teste');
  });
});
