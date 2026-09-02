# Tasks: Dashboard

> feature: dashboard

Status: pendente | em-andamento | concluida
(atalho: `onp-spec tarefa dashboard <T-xxx> <status>`)

## T-045 — Facade do consolidado com carregamento progressivo [pendente]

- Refs: AC-094, AC-096, AC-100, AC-101, AC-102, AC-103
- Arquivos: src/app/application/consolidado.facade.ts
- Esforço: alto
- Notas: depende de T-030 e T-036. Não existe endpoint de agregado: o consolidado custa uma consulta de carteiras mais uma de posições por carteira. Cada bloco preenche quando seus dados chegam. Falha nas posições de uma carteira degrada só o bloco daquela moeda e registra quantas carteiras entraram na conta; falha na listagem de carteiras impede o consolidado inteiro.

## T-046 — Agregação por moeda e percentual calculado na tela [pendente]

- Refs: AC-095, AC-096, AC-097, AC-098
- Arquivos: src/app/application/consolidado-agregacao.ts
- Esforço: alto
- Notas: depende de T-045. Soma separada por moeda, sem conversão cambial e sem nenhum total que combine BRL e USD. O valor investido de uma posição é quantidade vezes preço médio, calculado aqui, porque o backend não devolve esse campo. Percentual é razão entre resultado e investido; investido zero vira travessão, nunca zero por cento. Moeda sem carteira não gera bloco.

## T-047 — Tela do consolidado (`/dashboard`) [pendente]

- Refs: AC-094, AC-095, AC-096, AC-097, AC-098, AC-099, AC-100, AC-102, AC-103, AC-110
- Arquivos: src/app/presentation/features/dashboard/dashboard-page.ts, src/app/presentation/features/dashboard/bloco-moeda.ts
- Esforço: alto
- Notas: depende de T-010, T-045 e T-046. Só os blocos de moeda: o gráfico de aportes é outra tela (T-050) e esta página não dispara a consulta do histórico. Cada bloco tem skeleton próprio com a dimensão do conteúdo real. Resultado parcial é anunciado como parcial, com a ação de tentar as carteiras que faltaram. Investidor sem carteiras encontra o caminho para criar a primeira. Oferece o caminho para os aportes.

## T-048 — Horário e defasagem da cotação no consolidado [pendente]

- Refs: AC-104, AC-105
- Arquivos: src/app/presentation/features/dashboard/consolidado-cotacao.ts
- Esforço: medio
- Notas: depende de T-011 e T-047. Nenhum valor atual ou rentabilidade aparece sem o horário da cotação que o gerou (princípio P-004). O aviso de defasagem não é comunicado só por cor.

## T-049 — Facade do histórico de aportes [pendente]

- Refs: AC-106, AC-109
- Arquivos: src/app/application/aportes.facade.ts
- Esforço: medio
- Notas: depende de T-036. Usa o mesmo histórico de movimentações do investidor. Serve só à tela de aportes: o consolidado não a injeta, então uma falha aqui não tem como alcançar os blocos de moeda.

## T-050 — Tela de aportes (`/dashboard/aportes`) [pendente]

- Refs: AC-106, AC-107, AC-108, AC-109, AC-110
- Arquivos: src/app/presentation/features/dashboard/aportes/aportes-page.ts, src/app/presentation/features/dashboard/aportes/grafico-aportes.ts
- Esforço: alto
- Notas: depende de T-049. Rota própria, carregada sob demanda — quem abre o consolidado não paga esta consulta. Compras e vendas ao longo do tempo, e nada de série de cotação ou de patrimônio, que o backend não fornece. As séries se distinguem por rótulo ou legenda, não só por cor. Sem movimentações, estado vazio — não eixos e grade vazios. Oferece a volta para o consolidado. Agrupamento e escolha de biblioteca ainda em aberto (Q-013, Q-014, Q-015).
