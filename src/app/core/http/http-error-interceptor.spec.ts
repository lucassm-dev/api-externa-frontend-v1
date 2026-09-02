// T-009 — Tradução de erro da API para a tela. Testes-esqueleto de `onp-spec scaffold`:
// FALHAM até serem implementados. Mantenha a tag `@spec:` ao mover o teste.

describe('http-error-interceptor', () => {
  it('AC-010: Erro de validação vira mensagem no campo @spec:AC-010', () => {
    // Dado: um envio recusado com erro de validação (400 com `fieldErrors`)
    // Quando: a resposta chega à tela
    // Então: cada mensagem aparece no campo correspondente, identificado pelo nome do campo
    throw new Error('AC-010 ainda não provado — implemente este teste');
  });

  it('AC-011: Erro sem mensagem tem texto compreensível @spec:AC-011', () => {
    // Dado: um erro cuja resposta não traz `message` (o corpo padrão do Spring, que sai
    //       quando falta parâmetro obrigatório, o id não é numérico ou a rota não existe)
    // Quando: ele chega à tela
    // Então: vejo uma mensagem escrita pela aplicação, e nenhum detalhe técnico cru
    throw new Error('AC-011 ainda não provado — implemente este teste');
  });

  it('AC-012: Falha de serviço externo oferece tentar de novo @spec:AC-012', () => {
    // Dado: que uma fonte externa está indisponível (502)
    // Quando: o erro chega à tela
    // Então: vejo um aviso de que a falha é da fonte externa e uma ação de tentar de novo
    throw new Error('AC-012 ainda não provado — implemente este teste');
  });
});
