// T-005 — Store do investidor de contexto. Testes-esqueleto de `onp-spec scaffold`:
// FALHAM até serem implementados. Mantenha a tag `@spec:` ao mover o teste.

describe('investidor-contexto.store', () => {
  it('AC-005: O contexto sobrevive ao recarregamento da página @spec:AC-005', () => {
    // Dado: um investidor de contexto escolhido
    // Quando: recarrego a página
    // Então: o mesmo investidor continua em contexto, sem precisar escolher de novo
    throw new Error('AC-005 ainda não provado — implemente este teste');
  });

  it('AC-006: Contexto de investidor excluído não persiste @spec:AC-006', () => {
    // Dado: um contexto guardado que não consta mais entre os investidores
    // Quando: a aplicação carrega e revalida o contexto contra a LISTA de investidores
    //         (nunca contra a busca por identificador, que devolve investidor já excluído)
    // Então: o contexto é descartado e sou levado à tela de investidores
    throw new Error('AC-006 ainda não provado — implemente este teste');
  });

  it('AC-009: Trocar de investidor troca os dados exibidos @spec:AC-009', () => {
    // Dado: um investidor de contexto com dados carregados
    // Quando: escolho outro investidor
    // Então: os dados das áreas dependentes de investidor são recarregados para o novo
    throw new Error('AC-009 ainda não provado — implemente este teste');
  });
});
