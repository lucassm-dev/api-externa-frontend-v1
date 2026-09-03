# Tasks: Fundação

> feature: fundacao

Status: pendente | em-andamento | concluida
(atalho: `onp-spec tarefa fundacao <T-xxx> <status>`)

## T-001 — Tokens, base e tipografia do design system [concluida]
- Refs: AC-013, AC-015
- Arquivos: src/styles/_tokens.scss, src/styles/_base.scss, src/styles/_tipografia.scss, src/styles/index.scss, src/styles.scss
- Esforço: medio
- Notas: cor, tipografia, espaço e raio das tabelas do design system; foco visível no reset; a classe `.num` com `tabular-nums` é o que sustenta o alinhamento das colunas numéricas. Base de todas as demais tarefas de tela.

## T-002 — Classes de controle, tabela e card [pendente]

- Refs: AC-013, AC-014, AC-015
- Arquivos: src/styles/_controles.scss, src/styles/_tabela.scss, src/styles/_card.scss
- Esforço: medio
- Notas: depende de T-001. Botão em três níveis mais destrutivo, input, select, label; linha de 48px, cabeçalho fixo, coluna travada e gradiente de overflow; card, badge e chip. Variação de valor precisa de sinal ou rótulo além da cor.

## T-003 — Shell de navegação com sidebar e topbar [pendente]

- Refs: AC-001
- Arquivos: src/app/presentation/layout/shell/shell.ts, src/app/presentation/layout/shell/shell.spec.ts, src/app/app.ts, src/app/app.html, src/app/app.scss, src/app/app.spec.ts
- Esforço: medio
- Notas: sidebar de 240px e topbar de 64px; a área da rota atual fica destacada. A topbar hospeda o seletor de investidor de T-006.

## T-004 — Rotas da aplicação, raiz e página não encontrada [concluida]
- Refs: AC-002, AC-003
- Arquivos: src/app/app.routes.ts, src/app/app.routes.spec.ts, src/app/presentation/features/nao-encontrado/nao-encontrado.ts
- Esforço: baixo
- Notas: raiz redireciona para o dashboard; cada área é carregada sob demanda; endereço inexistente cai numa tela própria sem derrubar o shell.

## T-005 — Store do investidor de contexto com persistência e revalidação [pendente]

- Refs: AC-004, AC-005, AC-006, AC-009
- Arquivos: src/app/application/investidor-contexto.store.ts, src/app/application/investidor-contexto.store.spec.ts
- Esforço: alto
- Notas: único estado global da aplicação. Persiste em `localStorage` e revalida na abertura contra a listagem de investidores, não contra a busca por identificador — a busca por identificador não filtra inativos e deixaria o app preso num contexto morto. Trocar de investidor invalida os dados das facades dependentes.

## T-006 — Seletor de investidor na topbar [pendente]

- Refs: AC-004, AC-009
- Arquivos: src/app/shared/components/seletor-investidor/seletor-investidor.ts, src/app/shared/components/seletor-investidor/seletor-investidor.spec.ts
- Esforço: medio
- Notas: depende de T-005. Consome a mesma listagem que a revalidação já carrega.

## T-007 — Guard de contexto nas áreas que dependem de investidor [pendente]

- Refs: AC-007, AC-008
- Arquivos: src/app/core/guards/investidor-contexto.guard.ts, src/app/core/guards/investidor-contexto.guard.spec.ts
- Esforço: medio
- Notas: depende de T-005. Protege dashboard, carteiras e movimentações; catálogos de ações, corretoras e investidores ficam livres. Sem contexto, redireciona para investidores, onde se escolhe ou cadastra.

## T-008 — Configuração de HTTP, base da API e paginação [pendente]

- Refs: AC-010, AC-011, AC-012
- Arquivos: src/app/app.config.ts, src/app/core/config/api.config.ts, src/app/core/http/api-url-interceptor.ts, src/app/core/http/http-params.ts, src/app/domain/models/page.model.ts
- Esforço: baixo
- Notas: os repositórios declaram só o caminho do recurso; o interceptor prefixa com a base. `Page<T>` e a montagem dos parâmetros de paginação servem a todas as listagens.

## T-009 — Tradução de erro da API para a tela [pendente]

- Refs: AC-010, AC-011, AC-012
- Arquivos: src/app/core/http/http-error-interceptor.ts, src/app/core/http/http-error-interceptor.spec.ts, src/app/domain/models/api-error.model.ts
- Esforço: alto
- Notas: toda falha vira `ApiError`. Erro de validação carrega os erros por campo; erros não mapeados pelo backend chegam sem mensagem e precisam de texto próprio, nunca do corpo técnico cru; falha de serviço externo abre caminho para tentar de novo.

## T-010 — Componentes compartilhados de estado e navegação [pendente]

- Refs: AC-012, AC-013
- Arquivos: src/app/shared/components/skeleton-tabela/skeleton-tabela.ts, src/app/shared/components/estado-vazio/estado-vazio.ts, src/app/shared/components/card-erro/card-erro.ts, src/app/shared/components/paginador/paginador.ts, src/app/shared/components/modal-confirmacao/modal-confirmacao.ts, src/app/shared/components/componentes-estado.spec.ts
- Esforço: alto
- Notas: depende de T-002. O que é só aparência ficou em classe; o que tem comportamento ou estrutura vira componente. Usados por todas as telas de dado.

## T-011 — Frescor de cotação e badge de defasagem [pendente]

- Refs: AC-044, AC-045, AC-073, AC-104, AC-105
- Arquivos: src/app/application/cotacao-frescor.ts, src/app/shared/components/badge-defasagem/badge-defasagem.ts
- Esforço: medio
- Notas: o cálculo da defasagem fica num lugar só — trinta minutos para BR e cinco minutos para US, cada limiar saindo do atraso da própria fonte. Consumido pelo catálogo de ações, pelas posições e pelo consolidado.
