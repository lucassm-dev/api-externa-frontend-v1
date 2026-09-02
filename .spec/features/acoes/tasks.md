# Tasks: Ações

> feature: acoes

Status: pendente | em-andamento | concluida
(atalho: `onp-spec tarefa acoes <T-xxx> <status>`)

## T-023 — Contrato e repositório HTTP de ações [pendente]

- Refs: AC-036, AC-040, AC-041, AC-046, AC-048
- Arquivos: src/app/domain/models/acao.model.ts, src/app/domain/ports/acao-repository.port.ts, src/app/infra/http/acao-http.repository.ts, src/app/domain/enums/mercado.enum.ts
- Esforço: baixo
- Notas: depende de T-008. A exclusão é pela chave do ticker, não pelo identificador. A busca por ticker não filtra inativas. O nome da empresa vem sempre nulo e o modelo não deve fingir que existe. `dataHoraCotacao` chega como string e é normalizada para data aqui, na entrada do repositório — não existe camada de mappers, e o cálculo de defasagem (T-011) não deve receber string.

## T-024 — Facade de ações [pendente]

- Refs: AC-036, AC-040, AC-046, AC-047, AC-048
- Arquivos: src/app/application/acoes.facade.ts
- Esforço: medio
- Notas: depende de T-023. Também alimenta o seletor de papel do formulário de compra (T-040), filtrado pelo mercado da carteira.

## T-025 — Cadastro de ação por ticker e mercado [pendente]

- Refs: AC-036, AC-037, AC-038, AC-039
- Arquivos: src/app/presentation/features/acoes/acao-form.ts
- Esforço: alto
- Notas: depende de T-009 e T-024. A cotação é buscada no ato do cadastro. Ticker fora da fonte e fonte indisponível são casos distintos, com mensagens distintas, e ambos impedem o cadastro; ticker repetido chega como conflito.

## T-026 — Catálogo de ações com cotação, horário e rótulo por ticker [pendente]

- Refs: AC-040, AC-042, AC-043
- Arquivos: src/app/presentation/features/acoes/acoes-page.ts, src/app/principios.spec.ts
- Esforço: medio
- Notas: depende de T-010 e T-024. Nenhuma cotação aparece sem o horário em que foi obtida (princípio P-004). O ticker é o rótulo do papel: nunca exibir travessão no lugar de um nome de empresa que nunca vai existir.

## T-027 — Busca por ticker e exclusão de ação [pendente]

- Refs: AC-041, AC-042, AC-048
- Arquivos: src/app/presentation/features/acoes/acao-busca.ts
- Esforço: medio
- Notas: depende de T-010 e T-024. Busca sem resultado é estado vazio com orientação de cadastro, não card de erro. A exclusão é lógica e pede confirmação.

## T-028 — Sinalização de cotação defasada no catálogo [pendente]

- Refs: AC-044, AC-045
- Arquivos: src/app/presentation/features/acoes/acao-cotacao.ts
- Esforço: medio
- Notas: depende de T-011 e T-026. Quando todas as linhas estão defasadas, o aviso sobe para o cabeçalho do card uma única vez e some das células.

## T-029 — Atualizar cotação comparando o horário antes e depois [pendente]

- Refs: AC-046, AC-047
- Arquivos: src/app/presentation/features/acoes/acao-atualizar-cotacao.ts
- Esforço: medio
- Notas: depende de T-024. O endpoint responde com sucesso mesmo quando a fonte cai, devolvendo a última cotação conhecida — a única forma de saber se atualizou é comparar o horário da cotação antes e depois. Não atualizou vira aviso, não erro de tela.
