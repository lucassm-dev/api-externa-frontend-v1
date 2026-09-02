// Provas dos princípios da constituição que exigem `verificação(teste)`.
// Separado dos testes de feature de propósito: um princípio vale para o projeto inteiro,
// não para uma feature só, e o audit procura a tag `@principle:P-xxx` em qualquer teste.

describe('constituicao', () => {
  // P-004 só pode ser provado quando existir tela que exibe cotação — o catálogo de ações
  // (T-026) e o consolidado (T-048). Fica vermelho até lá, e é isso que o audit acusa.
  it('P-004: Nenhuma cotação é exibida sem o horário em que foi obtida @principle:P-004', () => {
    throw new Error('princípio P-004 ainda não provado — implemente junto de T-026 / T-048');
  });
});
