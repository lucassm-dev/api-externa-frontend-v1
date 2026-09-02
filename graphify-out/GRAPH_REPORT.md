# Graph Report - api-externa-frontend-v1  (2026-09-02)

## Corpus Check
- 9 files · ~133,587 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1008 nodes · 1834 edges · 72 communities (52 shown, 20 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 1% AMBIGUOUS · INFERRED: 193 edges (avg confidence: 0.87)
- Token cost: 122,139 input · 0 output

## Community Hubs (Navigation)
- Feature Carteiras
- Configuração do build Angular
- Dependências npm do projeto
- Contexto do investidor e deep-link
- Motor onp-spec (.agents) — audit
- Motor onp-spec — audit e parsers
- Motor onp-spec — audit e parsers (2)
- Motor onp-spec — CLI e plano
- Motor onp-spec (.agents) — ledger
- Motor onp-spec (.agents) — CLI
- Motor onp-spec — CLI e plano (2)
- Motor onp-spec (.agents) — plano
- Motor onp-spec — CLI e plano (3)
- Referência de UI: dashboard ACRU
- Bootstrap Angular e interceptors
- Motor onp-spec (.agents) — lições
- Referência de UI: lançamentos Investidor10
- Feature Dashboard consolidado
- Referência de UI: análise de resultados
- Referência de UI: agenda de proventos
- Erro da API traduzido para a tela
- Feature Dashboard consolidado (2)
- Referência de UI: listagem CRUD
- Referência de UI: carteira cripto
- Motor onp-spec (.agents) — sinais
- Referência de UI: posições Investidor10
- Feature Ações e frescor de cotação
- Feature Ações e frescor de cotação (2)
- Referência de UI: rentabilidade
- Referência de UI: metas de investimento
- Design system FEF Invest
- Referência de UI: dashboard Status Invest
- Referência de UI: painel Farmaku
- Referência de UI: patrimônio Status Invest
- Feature Fundação — shell e contexto
- Gramática da especificação
- Motor onp-spec (.agents) — scaffold
- Motor onp-spec — audit e parsers (3)
- Fluxo completo e preset LGPD
- Skill onp-spec — visão geral
- Motor onp-spec (.agents) — verify
- Motor onp-spec — audit e parsers (4)
- Constituição verificável
- Plano de execução e paralelismo
- Lições com lastro mecânico
- Regras de operação e correção
- Templates de constituição
- Paginação Page<T>
- Cadastro de corretora por CNPJ
- Angular CLI e MCP
- README e instruções do projeto
- Fontes de cotação e defasagem
- Regras de operação e correção (2)
- Enum Mercado
- Enum TipoOperacao
- README e instruções do projeto (2)
- Atualização silenciosa de cotação
- Contrato de carteiras e posições
- Erro da API traduzido para a tela (2)
- Investidores e escopo do MVP
- Mercado, moeda e consolidado
- Environments do Angular
- ASM-025 — Custo de uma consulta por carteira é aceitável no MVP
- ASM-004 — Plus Jakarta Sans entrega tabular-nums
- Feature Fundação — shell e contexto (2)
- Regras de uso do graphify no projeto
- Contrato de carteiras e posições (2)
- Paginação no domínio
- Camadas da arquitetura frontend
- Mercado, moeda e consolidado (2)
- Contexto do investidor e deep-link (2)
- Base da API e proxy de dev

## God Nodes (most connected - your core abstractions)
1. `run()` - 25 edges
2. `run()` - 25 edges
3. `ACRU Finance Dashboard UI Reference` - 17 edges
4. `Clientes List Screen Mockup` - 15 edges
5. `Crypto Wallet Dashboard UI Mockup` - 13 edges
6. `onp-spec-driven (variante Codex)` - 12 edges
7. `cmdLicoes()` - 11 edges
8. `cmdLicoes()` - 11 edges
9. `Quarterly Earnings Comparison Table` - 11 edges
10. `Investidor10 Posicoes Screenshot` - 11 edges

## Surprising Connections (you probably didn't know these)
- `onp-spec-driven (variante Codex)` --semantically_similar_to--> `onp-spec-driven (variante Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/SKILL.md → .claude/skills/onp-spec-driven/SKILL.md
- `Checklist de revisão de tela` --semantically_similar_to--> `Catálogo de problemas do audit`  [INFERRED] [semantically similar]
  docs/design-system-fef-invest.md → .agents/skills/onp-spec-driven/SKILL.md
- `Critério de aceite observável e amigável` --semantically_similar_to--> `Escrevendo especificações auditáveis (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/escrevendo-specs.md → .claude/skills/onp-spec-driven/references/escrevendo-specs.md
- `Fluxo detalhado — do zero ao audit limpo` --semantically_similar_to--> `Fluxo detalhado (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/fluxo.md → .claude/skills/onp-spec-driven/references/fluxo.md
- `Template constituição preset LGPD + Educação` --semantically_similar_to--> `Template preset LGPD + Educação (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/scripts/lib/templates/constituicao-lgpd-educacao.md → .claude/skills/onp-spec-driven/scripts/lib/templates/constituicao-lgpd-educacao.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fluxo do consolidado por moeda** — _spec_features_dashboard_tasks_t_045, _spec_features_dashboard_tasks_t_046, _spec_features_dashboard_tasks_t_047, _spec_features_dashboard_tasks_t_048, docs_superpowers_specs_2026_09_02_frontend_mvp_design_consolidado_1_mais_n [EXTRACTED 1.00]
- **Fluxo do investidor de contexto (store, seletor, guard e consumidores)** — _spec_features_fundacao_spec_investidor_de_contexto, _spec_features_fundacao_spec_us_002, _spec_features_fundacao_tasks_t_005, _spec_features_fundacao_tasks_t_006, _spec_features_fundacao_tasks_t_007, _spec_features_investidores_tasks_t_013, _spec_features_carteiras_tasks_t_031, _spec_features_operacoes_tasks_t_042, _spec_features_dashboard_tasks_t_045 [EXTRACTED 1.00]
- **Fluxo Especificar → Projetar → Tarefas → Plano → Executar → Auditar → Aprender** — _agents_skills_onp_spec_driven_skill_onp_spec_driven, _agents_skills_onp_spec_driven_references_escrevendo_specs_criterio_de_aceite_observavel, _agents_skills_onp_spec_driven_skill_plano_de_execucao, _agents_skills_onp_spec_driven_references_fluxo_fluxo_detalhado, _agents_skills_onp_spec_driven_references_licoes_licoes_aprendidas, _agents_skills_onp_spec_driven_references_constituicao_constituicao [EXTRACTED 1.00]
- **Frescor de cotação: limiar por mercado aplicado em catálogo, posições e consolidado** — _spec_constituicao_p_004, _spec_features_acoes_spec_defasagem_de_cotacao, _spec_features_fundacao_tasks_t_011, _spec_features_acoes_tasks_t_028, _spec_features_operacoes_tasks_t_039, _spec_features_dashboard_tasks_t_048, _spec_features_acoes_spec_us_014 [EXTRACTED 1.00]
- **Contratos e repositórios HTTP que sustentam a regra de camadas (P-005)** — _spec_constituicao_p_005, _spec_features_fundacao_tasks_t_008, _spec_features_investidores_tasks_t_012, _spec_features_corretoras_tasks_t_017, _spec_features_acoes_tasks_t_023, _spec_features_carteiras_tasks_t_030, _spec_features_operacoes_tasks_t_036 [INFERRED 0.85]
- **Lacunas do backend que moldaram decisões do frontend** — docs_api_backend_api_sem_cors, docs_api_backend_api_sem_autenticacao, docs_api_backend_api_sem_agregados, docs_api_backend_api_nomeempresa_null, docs_api_backend_api_exclusao_logica, docs_superpowers_specs_2026_09_02_frontend_mvp_design_acs_invalidadas [INFERRED 0.85]
- **Cadeia de rastreabilidade história → critério de aceite → tarefa → teste** — _agents_skills_onp_spec_driven_skill_codigos_de_rastreio, _agents_skills_onp_spec_driven_references_escrevendo_specs_dado_quando_entao, _agents_skills_onp_spec_driven_references_escrevendo_specs_formato_das_tarefas, _agents_skills_onp_spec_driven_skill_catalogo_de_problemas, _agents_skills_onp_spec_driven_references_licoes_sinais_json [INFERRED 0.85]
- **Degradação parcial: nunca exibir total incompleto como completo** — _spec_features_dashboard_spec_ac_100, _spec_features_dashboard_spec_ac_101, _spec_features_dashboard_spec_ac_102, _spec_features_dashboard_spec_ac_103, _spec_features_dashboard_tasks_t_045 [INFERRED 0.95]
- **Normalização na entrada do repositório em vez de camada de mappers** — claude_sem_camada_de_mappers, docs_superpowers_specs_2026_09_02_frontend_mvp_design_d_12, _spec_features_acoes_tasks_t_023, _spec_features_corretoras_tasks_t_017, claude_apierror [INFERRED 0.95]

## Communities (72 total, 20 thin omitted)

### Community 0 - "Feature Carteiras"
Cohesion: 0.05
Nodes (83): Constituição do projeto (princípios verificáveis), P-001 — Todo requisito tem prova executável, P-002 — Segredos nunca em código, P-003 — Sistema visual flat, sem sombra fora de duas exceções, P-004 — Nenhuma cotação exibida sem o horário em que foi obtida, P-005 — Componente não fala HTTP, Feature: Ações (catálogo global de papéis), Detecção de atualização por comparação de horário (+75 more)

### Community 1 - "Configuração do build Angular"
Cohesion: 0.05
Nodes (43): architect, prefix, projectType, root, schematics, sourceRoot, build, serve (+35 more)

### Community 2 - "Dependências npm do projeto"
Cohesion: 0.05
Nodes (43): @angular/build, @angular/common, @angular/compiler, @angular/compiler-cli, @angular/core, @angular/forms, @angular/platform-browser, @angular/router (+35 more)

### Community 3 - "Contexto do investidor e deep-link"
Cohesion: 0.06
Nodes (38): ASM-024 — Uma página grande de carteiras basta para o consolidado, AC-004 — O seletor lista os investidores e define o contexto, AC-005 — O contexto sobrevive ao recarregamento da página, AC-006 — Contexto de investidor excluído não persiste, AC-007 — Áreas que dependem de investidor exigem contexto, AC-008 — Catálogos continuam acessíveis sem contexto, AC-009 — Trocar de investidor troca os dados exibidos, AC-013 — Colunas numéricas alinham na vertical (+30 more)

### Community 4 - "Motor onp-spec (.agents) — audit"
Cohesion: 0.11
Nodes (32): auditProject(), CI_ESCALATES, finding(), latestMtime(), loadProject(), grepPattern(), scanAnnotations(), staticDirOf() (+24 more)

### Community 5 - "Motor onp-spec — audit e parsers"
Cohesion: 0.11
Nodes (32): auditProject(), CI_ESCALATES, finding(), latestMtime(), loadProject(), grepPattern(), scanAnnotations(), staticDirOf() (+24 more)

### Community 6 - "Motor onp-spec — audit e parsers (2)"
Cohesion: 0.14
Nodes (32): cmdLicoes(), linhaLicao(), DEFAULT_CONFIG, adicionarLicao(), agora(), caminhoRender(), caminhoStore(), campo() (+24 more)

### Community 7 - "Motor onp-spec — CLI e plano"
Cohesion: 0.13
Nodes (32): cmdEvento(), cmdResumo(), caminhos(), caminhoStream(), corta(), ESTADOS_FAIXA, homeOnp(), lerEventos() (+24 more)

### Community 8 - "Motor onp-spec (.agents) — ledger"
Cohesion: 0.13
Nodes (31): cmdResumo(), caminhos(), caminhoStream(), corta(), ESTADOS_FAIXA, homeOnp(), lerEventos(), lerStream() (+23 more)

### Community 9 - "Motor onp-spec (.agents) — CLI"
Cohesion: 0.12
Nodes (28): cmdAssumptions(), cmdEvento(), cmdInit(), cmdNew(), cmdStatus(), cmdStreamResumo(), cmdTarefa(), copyDirIfExists() (+20 more)

### Community 10 - "Motor onp-spec — CLI e plano (2)"
Cohesion: 0.13
Nodes (27): cmdAssumptions(), cmdInit(), cmdNew(), cmdStatus(), cmdStreamResumo(), cmdTarefa(), copyDirIfExists(), definirCampoTarefa() (+19 more)

### Community 11 - "Motor onp-spec (.agents) — plano"
Cohesion: 0.15
Nodes (26): cmdPlano(), gerarArtefatosPlano(), AGENTES, allowedTools(), descreveTarefa(), ehModeloClaude(), esc(), ESFORCO_CLI (+18 more)

### Community 12 - "Motor onp-spec — CLI e plano (3)"
Cohesion: 0.15
Nodes (26): cmdPlano(), gerarArtefatosPlano(), AGENTES, allowedTools(), descreveTarefa(), ehModeloClaude(), esc(), ESFORCO_CLI (+18 more)

### Community 13 - "Referência de UI: dashboard ACRU"
Cohesion: 0.11
Nodes (27): Add Widget Customization Action, Balance Overview Stacked Bar Chart, Chart Hover Tooltip with Series Breakdown, Bar / Line Chart Type Toggle, Collapsible Sidebar Navigation with Nested Items, Cost Analysis Segmented Bar with Category Legend, Financial Health Radial Gauge (75% of income saved), Non-Focused Bars Dimmed to Grey for Emphasis (+19 more)

### Community 14 - "Bootstrap Angular e interceptors"
Cohesion: 0.12
Nodes (11): Component, App, appConfig, routes, API_BASE_URL, apiUrlInterceptor(), httpErrorInterceptor(), ApiError (+3 more)

### Community 15 - "Motor onp-spec (.agents) — lições"
Cohesion: 0.18
Nodes (20): cmdLicoes(), linhaLicao(), adicionarLicao(), agora(), caminhoRender(), caminhoStore(), campo(), carregarLicoes() (+12 more)

### Community 16 - "Referência de UI: lançamentos Investidor10"
Cohesion: 0.15
Nodes (20): CTA primário Adicionar Lançamento, Identificação do ativo por logo + ticker (PETR3, VALE3), Campo Buscar ativos na tabela, Integração B3 (importação automática de lançamentos), Filtros do gráfico (periodicidade Mensal, janela 2 Anos, Todos os tipos), Card colapsável de seção (chevron no canto direito), Gráfico Consolidação de aportes (barras compras x vendas), Barra divergente acima/abaixo do zero para compras (verde) e vendas (rosa) (+12 more)

### Community 17 - "Feature Dashboard consolidado"
Cohesion: 0.14
Nodes (19): AC-095 — Nenhum número soma moedas diferentes, AC-106 — O gráfico mostra compras e vendas do histórico, AC-107 — Compra e venda se distinguem sem depender de cor, AC-108 — Investidor sem movimentações vê um estado vazio, não um eixo vazio, AC-109 — Uma falha no histórico pode ser tentada novamente, AC-110 — As duas telas do dashboard se alcançam, ASM-026 — Valor total e rentabilidade vêm prontos por posição, Consolidado por moeda montado no cliente (+11 more)

### Community 18 - "Referência de UI: análise de resultados"
Cohesion: 0.14
Nodes (18): Adicionar Ativo Action Button, Analise de Resultados Screen, Analyst Estimates Subscription Upsell (Assine Ja), Blurred Paywall Column (Estimativa 2T2026), Compact Number Formatting (K/M/B, pt-BR), Filter Bar (Ativo / Trimestre / Ano), Filtro Avancado Action Button, Green/Red Delta Color Coding with Arrows (+10 more)

### Community 19 - "Referência de UI: agenda de proventos"
Cohesion: 0.13
Nodes (18): Carteira Dropdown Filter, Categorias Dropdown Filter, Category Badge (Pagamentos / Proventos), Company Logo Thumbnail, Conteudos Dropdown Filter, Date-Grouped Event Timeline, Date Range Filter (25/08/2026 - 31/08/2026), Dividend / JCP Payout Event (+10 more)

### Community 20 - "Erro da API traduzido para a tela"
Cohesion: 0.14
Nodes (17): T-019 — Validação de CNPJ no cliente, T-020 — Cadastro de corretora por CNPJ, AC-010 — Erro de validação vira mensagem no campo, AC-011 — Erro sem mensagem tem texto compreensível, AC-012 — Falha de serviço externo oferece tentar de novo, US-003 — Entender o que deu errado, ApiError, httpErrorInterceptor (+9 more)

### Community 21 - "Feature Dashboard consolidado (2)"
Cohesion: 0.19
Nodes (17): AC-094 — Cada moeda tem seu próprio bloco, AC-096 — Cada bloco mostra investido, valor atual e resultado, AC-097 — O percentual é calculado na tela, AC-098 — Moeda sem carteira não vira bloco zerado, AC-099 — Investidor sem carteiras encontra o primeiro passo, AC-100 — Cada bloco carrega e aparece por conta própria, AC-101 — Falha em uma carteira não derruba a tela, AC-102 — Total parcial nunca se passa por total completo (+9 more)

### Community 22 - "Referência de UI: listagem CRUD"
Cohesion: 0.22
Nodes (16): Active Filter Chips with Clear All, Admin Dashboard Layout with Collapsed Icon Sidebar, Brazilian pt-BR Business Domain (CNPJ, UF), Cascading Location Filters (Estado, Municipio, Bairro), Cliente Entity Fields (Razao Social, Responsavel, CNPJ, UF, Municipio, Bairro), Clientes List Screen Mockup, CRUD List Screen UI Pattern, Data Table with Sortable Columns (+8 more)

### Community 23 - "Referência de UI: carteira cripto"
Cohesion: 0.17
Nodes (16): Account Profile Menu with Notifications, Balance Card with Quick Action Row, Balance Visibility Toggle (Eye Icon), Rounded Card Grid Dashboard Layout, Crypto Wallet Dashboard UI Mockup, Dark Theme with Neon Yellow Accent, Weekly Earnings Bar Chart, Frontend UI Design Reference for Project (+8 more)

### Community 24 - "Motor onp-spec (.agents) — sinais"
Cohesion: 0.30
Nodes (12): DEFAULT_CONFIG, LICOES_DEFAULTS, agora(), caminhoSinais(), carregarSinais(), compactar(), refDoAchado(), registrar() (+4 more)

### Community 25 - "Referência de UI: posições Investidor10"
Cohesion: 0.21
Nodes (15): Adicionar Lancamento Primary CTA, Asset Class Accordion Grouping, B3 Brokerage Integration Entry Point, Buy Recommendation and Asset Score, Zeroed Empty Asset Class Rows, Green/Red Gain-Loss Color Coding, Horizontal Section Tab Navigation, KPI Summary Cards Row (+7 more)

### Community 26 - "Feature Ações e frescor de cotação"
Cohesion: 0.18
Nodes (14): T-023 — Contrato e repositório HTTP de ações, T-024 — Facade de ações, T-025 — Cadastro de ação por ticker e mercado, T-027 — Busca por ticker e exclusão de ação, T-029 — Atualizar cotação comparando o horário antes e depois, T-017 — Contrato e repositório HTTP de corretoras, T-018 — Facade de corretoras, T-021 — Listagem de corretoras com paginação e campos ausentes (+6 more)

### Community 27 - "Feature Ações e frescor de cotação (2)"
Cohesion: 0.15
Nodes (14): T-026 — Catálogo de ações com cotação, horário e rótulo por ticker, T-028 — Sinalização de cotação defasada no catálogo, AC-104 — Nenhum número aparece sem o horário da cotação que o gerou, AC-105 — Consolidado com cotação defasada é sinalizado, Q-016 — Qual horário exibir no bloco de moeda, T-048 — Horário e defasagem da cotação no consolidado, ACs da tentativa anterior que não se sustentam, CotacaoFrescor (+6 more)

### Community 28 - "Referência de UI: rentabilidade"
Cohesion: 0.25
Nodes (14): B3 Integration and Add Transaction Actions, CDI Benchmark Comparison Indicator, Chart Filter Controls (Period and Asset Type), Empty/Zero Data State, Index Series Legend Toggles (CDI, IPCA, IFIX, IBOV, SMLL, IDIV, IVVB11), KPI Summary Cards Column, Monthly Returns Table by Year, Portfolio Selector (Carteira 1) (+6 more)

### Community 29 - "Referência de UI: metas de investimento"
Cohesion: 0.19
Nodes (14): Metas em Andamento vs Metas Concluidas Sectioning, Criar Nova Meta Action Button, Empty State Message (Nao ha metas concluidas), Estimated Completion Date Projection, Goal Card Layout with Progress Bar, Highlighted Objective Tile (dark navy emphasis), Investment Goal Tracking (Metas), Per-Card Kebab Menu (edit/delete goal) (+6 more)

### Community 30 - "Design system FEF Invest"
Cohesion: 0.19
Nodes (13): Checklist de revisão de tela, Estados: skeleton, vazio, erro e cotação defasada, FEF Invest — Design System, Regras de gráficos, Teal só em elemento interativo, Shell: sidebar 240px + topbar 64px, Sistema flat e suas duas exceções, Tabela com coluna travada e overflow horizontal (+5 more)

### Community 31 - "Referência de UI: dashboard Status Invest"
Cohesion: 0.21
Nodes (13): Asset Allocation Panel (Composicao), B3 Integration for Portfolio Automation, White Card Grid Layout on Light Background, Status Invest Dashboard Screenshot, Goals Empty State (Metas / Cadastrar), Header Action Bar (Carteira, Adicionar Ativo, Automatizar Carteira), Month-over-Month Comparison Metric, Performance Summary KPI Cards (Rentabilidade, Patrimonio, Proventos) (+5 more)

### Community 32 - "Referência de UI: painel Farmaku"
Cohesion: 0.26
Nodes (12): Best & Least Selling Products Bar Chart with Tooltip, CRUD Admin Panel Layout Pattern, Dark Mode Toggle in Preferences Section, Product Data Table with Search, Filters and Row Actions, Product Stock Overview Donut Chart with Center Total, Farmaku Product Dashboard UI Reference, KPI Stat Card Row (Total Products, Categories, Low Stock, Out of Stock), Navy-on-White Palette with Pastel Semantic Tints (+4 more)

### Community 33 - "Referência de UI: patrimônio Status Invest"
Cohesion: 0.27
Nodes (11): Header com Busca Global de Ativos, Filtros de Visao (Completo, Patrimonio, Periodo), Estado Quase Vazio (carteira com um unico aporte), Grafico de Evolucao do Patrimonio, Resumo de Desempenho de Patrimonio (KPIs), Barra de Acoes da Carteira (Personalizar, Adicionar Ativo, Automatizar), Navegacao por Abas da Carteira, Toggle de Ocultar Valores (icone de olho) (+3 more)

### Community 34 - "Feature Fundação — shell e contexto"
Cohesion: 0.20
Nodes (10): AC-001 — A navegação lista as áreas e destaca a atual, AC-002 — A rota raiz leva ao dashboard, AC-003 — Endereço inexistente informa sem derrubar a navegação, US-001 — Navegar pelas áreas do sistema, Fluxo spec-driven (onp-spec-driven), D-02 — Escopo do MVP em 7 features, D-09 — Rota raiz é o dashboard, Q-009 (design) — Há investidores seed (+2 more)

### Community 35 - "Gramática da especificação"
Cohesion: 0.25
Nodes (9): Ciclo de vida do status da spec, Critério de aceite observável e amigável, Dado / Quando / Então, Pergunta em aberto (Q-xxx), Suposição (ASM-xxx), Template spec.md, Códigos de rastreio US/AC/T/ASM/Q/P, Escrevendo especificações auditáveis (cópia Claude Code) (+1 more)

### Community 36 - "Motor onp-spec (.agents) — scaffold"
Cohesion: 0.44
Nodes (8): detectStyle(), jsFail(), jsHeader(), renderJsPrinciple(), renderJsTest(), renderPyPrinciple(), renderPyTest(), scaffoldTests()

### Community 37 - "Motor onp-spec — audit e parsers (3)"
Cohesion: 0.44
Nodes (8): detectStyle(), jsFail(), jsHeader(), renderJsPrinciple(), renderJsTest(), renderPyPrinciple(), renderPyTest(), scaffoldTests()

### Community 38 - "Fluxo completo e preset LGPD"
Cohesion: 0.25
Nodes (8): Exemplo: feature entrega-dever-casa, Fluxo detalhado — do zero ao audit limpo, Integração com CI, Tabela de status (onp-spec status), P-001 [DEVE] Nota de um aluno nunca é exposta a outro aluno, Template constituição preset LGPD + Educação, Fluxo detalhado (cópia Claude Code), Template preset LGPD + Educação (cópia Claude Code)

### Community 39 - "Skill onp-spec — visão geral"
Cohesion: 0.29
Nodes (8): Por que isso mata o vibecoding, Auto-dimensionamento das fases, Catálogo de problemas do audit, Contrato de execução inegociável, Degradação graciosa sem node, Motor embarcado onp-spec.mjs, onp-spec-driven (variante Codex), Desenvolvimento spec-anchored

### Community 40 - "Motor onp-spec (.agents) — verify"
Cohesion: 0.43
Nodes (7): extractTags(), gitRev(), parseJsonReport(), parseTap(), resultsByTag(), runVerify(), STATUS_RANK

### Community 41 - "Motor onp-spec — audit e parsers (4)"
Cohesion: 0.43
Nodes (7): extractTags(), gitRev(), parseJsonReport(), parseTap(), resultsByTag(), runVerify(), STATUS_RANK

### Community 42 - "Constituição verificável"
Cohesion: 0.33
Nodes (6): Constituição — princípios que a máquina verifica, Quatro formas de verificação de princípio, Níveis de obrigação [DEVE]/[RECOMENDADO]/[PODE], Preset LGPD + educação, Rastreabilidade princípio → arquivo → linha, Constituição verificável (cópia Claude Code)

### Community 43 - "Plano de execução e paralelismo"
Cohesion: 0.33
Nodes (6): Formato dos campos de tarefa (Refs / Arquivos / Modelo / Esforço), Faixas paralelas (worktree + branch + contexto limpo), Template tasks.md, Plano de execução com paralelismo opcional, Template tasks.md (cópia Claude Code), Plano de execução com claude headless

### Community 44 - "Lições com lastro mecânico"
Cohesion: 0.33
Nodes (6): Ciclo de vida da lição (candidata → confirmada → quarentena), Dedup exato-após-normalização das lições, Lastro mecânico (LICAO_SEM_LASTRO), Lições — aprendizado com lastro mecânico, Histórico de sinais (.spec/verification/sinais.json), Lições com lastro mecânico (cópia Claude Code)

### Community 45 - "Regras de operação e correção"
Cohesion: 0.33
Nodes (6): Recurso /operacoes, PosicaoService — posição é derivada, não escrita, RN-P02 — preço médio ponderado em compras sucessivas, RN-P03 — não se vende mais do que a posição atual, RN-Q04 — compra e venda usam a cotação do momento, Enum TipoOperacao (COMPRA | VENDA)

### Community 46 - "Templates de constituição"
Cohesion: 0.40
Nodes (5): Template constituição base v1.1.0, P-001 [DEVE] Todo requisito tem prova executável, P-002 [RECOMENDADO] Segredos nunca em código, P-004 [DEVE] Dados pessoais nunca aparecem em logs, Template constituição base (cópia Claude Code)

### Community 48 - "Cadastro de corretora por CNPJ"
Cohesion: 0.50
Nodes (4): BrasilAPI / CNPJ, BrasilAPI / CVM, Recurso /corretoras e pipeline de cadastro, ViaCEP

### Community 49 - "Angular CLI e MCP"
Cohesion: 0.50
Nodes (3): npx, angular-cli, @angular/cli

### Community 50 - "README e instruções do projeto"
Cohesion: 0.67
Nodes (3): Contrato de execução (Claude Code), Motor embarcado onp-spec.mjs (Claude Code), onp-spec-driven (variante Claude Code)

### Community 51 - "Fontes de cotação e defasagem"
Cohesion: 0.67
Nodes (3): Recurso /acoes, brapi.dev (cotação BR, ~30 min de defasagem), Twelve Data (cotação US, 0,3 a 2 min de defasagem)

### Community 52 - "Regras de operação e correção (2)"
Cohesion: 0.67
Nodes (3): ASM-D02 — Volume de operações cabe na paginação padrão, D-07 — Histórico de movimentações só global, Q-004 (design) — Excluir carteira com posições

## Ambiguous Edges - Review These
- `Filtros do gráfico (periodicidade Mensal, janela 2 Anos, Todos os tipos)` → `Colunas do lançamento (Ativo, Tipo de investimento, Tipo de ordem, Quantidade, Preço unitário, Total, Quantidade Total, Data do lançamento, Fonte, Opções)`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092544.png · relation: conceptually_related_to
- `Analyst Estimates Subscription Upsell (Assine Ja)` → `UI Reference for Angular Frontend Implementation`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092906.png · relation: conceptually_related_to
- `B3 Ticker Dataset (NORD3, PASS3, VULC3, CXSE3, BBML3, BBSE3, HBTS5, PATI4, UCAS3)` → `UI Reference for Angular Frontend Implementation`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092906.png · relation: semantically_similar_to
- `Company Logo Thumbnail` → `US Tickers (TRST, UFCS, WSBC)`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092950.png · relation: conceptually_related_to
- `Date-Grouped Event Timeline` → `Date Range Filter (25/08/2026 - 31/08/2026)`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092950.png · relation: conceptually_related_to
- `Admin Dashboard Layout with Collapsed Icon Sidebar` → `Frontend UI Reference Spec for api-externa-frontend`  [AMBIGUOUS]
  docs/references/a6c73fd425530d01b446d08a8c24be3e.webp · relation: conceptually_related_to
- `Rounded Card Grid Dashboard Layout` → `Frontend UI Design Reference for Project`  [AMBIGUOUS]
  docs/references/original-e1585af222b84556e6be4d30c52f5681.webp · relation: conceptually_related_to
- `Buy Recommendation and Asset Score` → `Ideal vs Actual Allocation Percentage`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092407.png · relation: conceptually_related_to
- `B3 Integration and Add Transaction Actions` → `Empty/Zero Data State`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092505.png · relation: conceptually_related_to
- `Empty/Zero Data State` → `Monthly Returns Table by Year`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092505.png · relation: conceptually_related_to
- `Estimated Completion Date Projection` → `Media de Proventos Mensais Goal (Acoes, FIIs, Stocks, BDRs)`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092613.png · relation: conceptually_related_to
- `B3 Integration for Portfolio Automation` → `Status Invest Dashboard Screenshot`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 093015.png · relation: references
- `Template placeholder do Angular CLI (app.html)` → `Tokens de cor`  [AMBIGUOUS]
  src/app/app.html · relation: conceptually_related_to
- `Best & Least Selling Products Bar Chart with Tooltip` → `Farmaku Product Dashboard UI Reference`  [AMBIGUOUS]
  docs/references/eb7620cd3e178bd6059d850dbf2d2377.webp · relation: conceptually_related_to
- `Header com Busca Global de Ativos` → `Barra de Acoes da Carteira (Personalizar, Adicionar Ativo, Automatizar)`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092809.png · relation: semantically_similar_to
- `Frontend UI Design Reference for Angular App` → `Personal Finance Dashboard Pattern`  [AMBIGUOUS]
  docs/references/1d60937832a1a7f4028b1737834740f2.webp · relation: conceptually_related_to

## Knowledge Gaps
- **223 isolated node(s):** `Page`, `Mercado`, `TipoOperacao`, `FieldError`, `__dirname` (+218 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Filtros do gráfico (periodicidade Mensal, janela 2 Anos, Todos os tipos)` and `Colunas do lançamento (Ativo, Tipo de investimento, Tipo de ordem, Quantidade, Preço unitário, Total, Quantidade Total, Data do lançamento, Fonte, Opções)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Analyst Estimates Subscription Upsell (Assine Ja)` and `UI Reference for Angular Frontend Implementation`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `B3 Ticker Dataset (NORD3, PASS3, VULC3, CXSE3, BBML3, BBSE3, HBTS5, PATI4, UCAS3)` and `UI Reference for Angular Frontend Implementation`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Company Logo Thumbnail` and `US Tickers (TRST, UFCS, WSBC)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Date-Grouped Event Timeline` and `Date Range Filter (25/08/2026 - 31/08/2026)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Admin Dashboard Layout with Collapsed Icon Sidebar` and `Frontend UI Reference Spec for api-externa-frontend`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Rounded Card Grid Dashboard Layout` and `Frontend UI Design Reference for Project`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._