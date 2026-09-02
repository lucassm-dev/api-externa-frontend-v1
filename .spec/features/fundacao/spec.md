# Spec: Fundacao

> feature: fundacao
> status: rascunho

<!--
  Insumos: docs/superpowers/specs/2026-09-02-frontend-mvp-design.md (seções 1, 2 e 3),
  docs/api/backend-api.md, docs/design-system-fef-invest.md.
  Códigos de rastreio são globais e contínuos no projeto inteiro.
-->

## Contexto

A base sobre a qual as outras seis features rodam: o shell de navegação, o investidor de
contexto (não há login — o backend não tem autenticação), o tratamento central de erro e a
fundação visual do design system. Carteiras, movimentações e dashboard dependem do
investidor de contexto; todas as telas dependem do mapeamento consistente de erro e das
classes de `src/styles/`.

## Histórias

### US-001 — Navegar pelas áreas do sistema

Como investidor, quero um shell com navegação para as áreas do sistema, para me mover entre
dashboard, carteiras, movimentações, ações, corretoras e investidores.

#### AC-001 — A navegação lista as áreas e destaca a atual

- **Dado** que abro a aplicação
- **Quando** a tela carrega
- **Então** vejo uma navegação com Dashboard, Carteiras, Movimentações, Ações, Corretoras e
  Investidores, e a área correspondente à rota atual aparece destacada
- **E** Dashboard abre as sub-áreas Consolidado e Aportes, com a sub-área atual também
  destacada quando estou numa delas

#### AC-002 — A rota raiz leva ao dashboard

- **Dado** que acesso a rota raiz `/`
- **Quando** a aplicação carrega
- **Então** sou levado ao dashboard

#### AC-003 — Endereço inexistente informa sem derrubar a navegação

- **Dado** que acesso um endereço que não existe no sistema
- **Quando** a tela carrega
- **Então** vejo um aviso de página não encontrada com um caminho de volta, e a navegação
  do shell continua visível e utilizável

### US-002 — Escolher o investidor de contexto

Como investidor, quero escolher qual investidor está em contexto, para que carteiras,
movimentações e dashboard sejam os dele (não há login no MVP).

#### AC-004 — O seletor lista os investidores e define o contexto

- **Dado** que existem investidores cadastrados
- **Quando** abro o seletor no topo da tela
- **Então** vejo a lista de investidores (`GET /investidores`) e, ao escolher um, ele passa
  a ser o investidor de contexto

#### AC-005 — O contexto sobrevive ao recarregamento da página

- **Dado** um investidor de contexto escolhido
- **Quando** recarrego a página
- **Então** o mesmo investidor continua em contexto, sem precisar escolher de novo

#### AC-006 — Contexto de investidor excluído não persiste

- **Dado** um investidor guardado como contexto que não consta mais entre os investidores
  ativos
- **Quando** a aplicação carrega e revalida o contexto contra a lista de investidores
- **Então** o contexto é descartado e sou levado à tela de investidores para escolher outro

#### AC-007 — Áreas que dependem de investidor exigem contexto

- **Dado** que não há investidor de contexto
- **Quando** tento acessar dashboard, carteiras ou movimentações
- **Então** sou levado à tela de investidores, e nenhuma chamada a `/carteiras` ou
  `/operacoes` é disparada sem `investidorId`

#### AC-008 — Catálogos continuam acessíveis sem contexto

- **Dado** que não há investidor de contexto
- **Quando** acesso ações, corretoras ou investidores
- **Então** as telas carregam normalmente, porque são catálogos globais e não dependem de
  investidor

#### AC-009 — Trocar de investidor troca os dados exibidos

- **Dado** um investidor de contexto com dados carregados na tela
- **Quando** escolho outro investidor no seletor
- **Então** os dados das áreas dependentes de investidor são recarregados para o novo
  contexto, sem restar dado do investidor anterior na tela

### US-003 — Entender o que deu errado

Como investidor, quero mensagens de erro claras e consistentes, para saber o que aconteceu
e o que fazer.

#### AC-010 — Erro de validação vira mensagem no campo

- **Dado** um envio de formulário recusado com erro de validação (400 com `fieldErrors`)
- **Quando** a resposta chega à tela
- **Então** cada mensagem aparece no campo correspondente, identificado pelo nome do campo
  que veio na resposta

#### AC-011 — Erro sem mensagem tem texto compreensível

- **Dado** um erro cuja resposta não traz mensagem (o corpo padrão do servidor, sem
  `message`)
- **Quando** ele chega à tela
- **Então** vejo uma mensagem compreensível escrita pela aplicação, e nenhum detalhe
  técnico cru é exibido

#### AC-012 — Falha de serviço externo oferece tentar de novo

- **Dado** que uma fonte externa está indisponível (502)
- **Quando** o erro chega à tela
- **Então** vejo um aviso de que a falha é da fonte externa e um botão para tentar de novo,
  em vez de uma mensagem que culpe o que eu digitei

### US-004 — Ler números e estados sem ambiguidade

Como investidor, quero que a interface siga um padrão visual consistente, para comparar
números de relance e enxergar o estado de cada tela.

#### AC-013 — Colunas numéricas alinham na vertical

- **Dado** uma tabela com valores de tamanhos diferentes na mesma coluna
- **Quando** vejo a coluna
- **Então** os números estão alinhados à direita e os separadores decimais alinham na
  vertical entre as linhas

#### AC-014 — Variação nunca é comunicada só por cor

- **Dado** um valor que representa alta ou baixa
- **Quando** ele é exibido
- **Então** além da cor há uma seta indicando a direção, de modo que a informação continue
  legível sem distinguir as cores

#### AC-015 — Todo controle mostra o foco de teclado

- **Dado** que navego a tela usando apenas o teclado
- **Quando** o foco chega a um botão, campo ou link
- **Então** o elemento focado é visivelmente destacado

## Fora de escopo

- Login, cadastro com senha e autenticação — o backend não tem Spring Security no MVP.
- Controle de acesso: qualquer pessoa pode escolher qualquer investidor no seletor. O
  contexto é conveniência de navegação, não segurança.
- Tema escuro, ocultar valores e preferências de usuário.
- Internacionalização — a aplicação é só pt-BR.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-001 | Nenhum ambiente tem mais investidores do que cabe numa página de 100, então o seletor carrega `GET /investidores?size=100` e não pagina | aberta | — |
| ASM-002 | O contexto é guardado em `localStorage` sob uma chave própria da aplicação; limpar o armazenamento do navegador devolve o usuário ao seletor, o que é aceitável | confirmada | Decisão D-05 do design |
| ASM-003 | Revalidar o contexto contra `GET /investidores` (só ativos) é suficiente; `GET /investidores/{id}` não serve porque devolve 200 para investidor já excluído | confirmada | Confirmado no código do backend (`InvestidorService.buscarPorId` não filtra `ativo`) |
| ASM-004 | Plus Jakarta Sans entrega `tabular-nums`; se a verificação da regra 6 da seção 2 do design system falhar, a classe `.num` passa a usar Inter apenas nas células numéricas | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-001 | Se o investidor de contexto for excluído enquanto a aplicação está aberta, o app deve detectar na hora ou só na próxima abertura? | respondida | Só na próxima abertura. Durante a sessão, as chamadas seguintes falham com 404, que as telas já tratam — sem polling nem revalidação por navegação |
