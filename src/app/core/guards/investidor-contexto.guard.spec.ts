// T-007 — Guard de contexto. Testes-esqueleto de `onp-spec scaffold`: FALHAM até serem
// implementados. Mantenha a tag `@spec:` ao mover o teste.

describe('investidor-contexto.guard', () => {
  it('AC-007: Áreas que dependem de investidor exigem contexto @spec:AC-007', () => {
    // Dado: que não há investidor de contexto
    // Quando: tento acessar dashboard, carteiras ou movimentações
    // Então: sou levado à tela de investidores
    // E: nenhuma chamada dependente de investidor chega a ser disparada
    throw new Error('AC-007 ainda não provado — implemente este teste');
  });

  it('AC-008: Catálogos continuam acessíveis sem contexto @spec:AC-008', () => {
    // Dado: que não há investidor de contexto
    // Quando: acesso ações, corretoras ou investidores
    // Então: as telas carregam normalmente, porque são catálogos globais
    throw new Error('AC-008 ainda não provado — implemente este teste');
  });
});
