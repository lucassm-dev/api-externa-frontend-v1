// T-004 — Rotas da aplicação. Testes-esqueleto de `onp-spec scaffold`: FALHAM até serem
// implementados. Mover o teste é permitido; mover sem a tag `@spec:` não é.

describe('rotas', () => {
  it('AC-002: A rota raiz leva ao dashboard @spec:AC-002', () => {
    // Dado: que acesso a rota raiz `/`
    // Quando: a aplicação carrega
    // Então: sou levado ao dashboard
    throw new Error('AC-002 ainda não provado — implemente este teste');
  });

  it('AC-003: Endereço inexistente informa sem derrubar a navegação @spec:AC-003', () => {
    // Dado: que acesso um endereço que não existe no sistema
    // Quando: a tela carrega
    // Então: vejo um aviso de página não encontrada com um caminho de volta, e a navegação
    //        do shell continua visível e utilizável
    throw new Error('AC-003 ainda não provado — implemente este teste');
  });
});
