# Graph Report - api-externa-frontend-v1  (2026-09-02)

## Corpus Check
- 21 files · ~133,053 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 961 nodes · 1871 edges · 62 communities (57 shown, 5 thin omitted)
- Extraction: 90% EXTRACTED · 9% INFERRED · 1% AMBIGUOUS · INFERRED: 165 edges (avg confidence: 0.86)
- Token cost: 203,181 input · 0 output

## Community Hubs (Navigation)
- Motor onp-spec — CLI e plano
- Motor onp-spec — audit e parsers
- Configuração do build Angular
- Dependências npm do projeto
- Motor onp-spec (.agents) — audit
- Motor onp-spec (.agents) — ledger
- Motor onp-spec (.agents) — CLI
- Motor onp-spec (.agents) — plano
- Referência de UI: dashboard ACRU
- Bootstrap Angular e interceptors
- Feature Ações e frescor de cotação
- Motor onp-spec (.agents) — lições
- Feature Carteiras
- Referência de UI: lançamentos Investidor10
- Camada HTTP compartilhada das features
- Referência de UI: análise de resultados
- Referência de UI: agenda de proventos
- Referência de UI: listagem CRUD
- Referência de UI: carteira cripto
- Motor onp-spec (.agents) — sinais
- Referência de UI: posições Investidor10
- Referência de UI: rentabilidade
- Referência de UI: metas de investimento
- Feature Investidores
- Referência de UI: dashboard Status Invest
- Feature Fundação — shell e contexto
- Design system FEF Invest
- Referência de UI: painel Farmaku
- Feature Corretoras
- Feature Dashboard consolidado
- Referência de UI: patrimônio Status Invest
- Gramática da especificação
- README e instruções do projeto
- Feature Operações
- Motor onp-spec (.agents) — scaffold
- Fluxo completo e preset LGPD
- Skill onp-spec — visão geral
- Motor onp-spec (.agents) — verify
- Design system e acessibilidade
- Camadas da arquitetura frontend
- Estado com signals e releitura
- Regras de operação e correção
- Contexto do investidor e deep-link
- Constituição verificável
- Plano de execução e paralelismo
- Lições com lastro mecânico
- Base da API e proxy de dev
- Fontes de cotação e defasagem
- Cadastro de corretora por CNPJ
- Contrato de carteiras e posições
- Mercado, moeda e consolidado
- Templates de constituição
- Erro da API traduzido para a tela
- Investidores e escopo do MVP
- Paginação Page<T>
- Angular CLI e MCP
- Paginação no domínio
- Atualização silenciosa de cotação
- Enum Mercado
- Enum TipoOperacao
- Arquitetura em camadas
- Environments do Angular

## God Nodes (most connected - your core abstractions)
1. `run()` - 25 edges
2. `run()` - 25 edges
3. `ACRU Finance Dashboard UI Reference` - 17 edges
4. `Clientes List Screen Mockup` - 15 edges
5. `T-010 — Componentes compartilhados de estado e navegação` - 15 edges
6. `Crypto Wallet Dashboard UI Mockup` - 13 edges
7. `Feature: Operações (posições, compra, venda, movimentações)` - 13 edges
8. `onp-spec-driven (variante Codex)` - 12 edges
9. `Feature: Carteiras` - 12 edges
10. `Feature: Fundação (shell, contexto, erro, design system)` - 12 edges

## Surprising Connections (you probably didn't know these)
- `onp-spec-driven (variante Codex)` --semantically_similar_to--> `onp-spec-driven (variante Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/SKILL.md → .claude/skills/onp-spec-driven/SKILL.md
- `Checklist de revisão de tela` --semantically_similar_to--> `Catálogo de problemas do audit`  [INFERRED] [semantically similar]
  docs/design-system-fef-invest.md → .agents/skills/onp-spec-driven/SKILL.md
- `Critério de aceite observável e amigável` --semantically_similar_to--> `Escrevendo especificações auditáveis (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/escrevendo-specs.md → .claude/skills/onp-spec-driven/references/escrevendo-specs.md
- `Constituição — princípios que a máquina verifica` --semantically_similar_to--> `Constituição verificável (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/constituicao.md → .claude/skills/onp-spec-driven/references/constituicao.md
- `Fluxo detalhado — do zero ao audit limpo` --semantically_similar_to--> `Fluxo detalhado (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/fluxo.md → .claude/skills/onp-spec-driven/references/fluxo.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Contratos e repositórios HTTP que sustentam a regra de camadas (P-005)** — _spec_constituicao_p_005, _spec_features_fundacao_tasks_t_008, _spec_features_investidores_tasks_t_012, _spec_features_corretoras_tasks_t_017, _spec_features_acoes_tasks_t_023, _spec_features_carteiras_tasks_t_030, _spec_features_operacoes_tasks_t_036 [INFERRED 0.85]
- **Fluxo do investidor de contexto (store, seletor, guard e consumidores)** — _spec_features_fundacao_spec_investidor_de_contexto, _spec_features_fundacao_spec_us_002, _spec_features_fundacao_tasks_t_005, _spec_features_fundacao_tasks_t_006, _spec_features_fundacao_tasks_t_007, _spec_features_investidores_tasks_t_013, _spec_features_carteiras_tasks_t_031, _spec_features_operacoes_tasks_t_042, _spec_features_dashboard_tasks_t_045 [EXTRACTED 1.00]
- **Frescor de cotação: limiar por mercado aplicado em catálogo, posições e consolidado** — _spec_constituicao_p_004, _spec_features_acoes_spec_defasagem_de_cotacao, _spec_features_fundacao_tasks_t_011, _spec_features_acoes_tasks_t_028, _spec_features_operacoes_tasks_t_039, _spec_features_dashboard_tasks_t_048, _spec_features_acoes_spec_us_014 [EXTRACTED 1.00]
- **Camadas do frontend com dependência apontando para dentro** — claude_domain_layer, claude_infra_layer, claude_application_layer, claude_presentation_layer, claude_core_layer, claude_shared_layer, claude_layered_architecture [EXTRACTED 1.00]
- **Fluxo do investidor de contexto (storage → guard → revalidação → deep-link)** — docs_superpowers_specs_2026_09_02_frontend_mvp_design_d05_investidor_contexto, docs_superpowers_specs_2026_09_02_frontend_mvp_design_investidor_contexto_guard, docs_superpowers_specs_2026_09_02_frontend_mvp_design_investidorcontextostore, docs_superpowers_specs_2026_09_02_frontend_mvp_design_revalidacao_por_lista, docs_superpowers_specs_2026_09_02_frontend_mvp_design_deep_link_carteira, docs_api_backend_api_investidores [EXTRACTED 1.00]
- **Lacunas do backend que moldaram decisões do frontend** — docs_api_backend_api_sem_cors, docs_api_backend_api_sem_autenticacao, docs_api_backend_api_sem_agregados, docs_api_backend_api_nomeempresa_null, docs_api_backend_api_exclusao_logica, docs_superpowers_specs_2026_09_02_frontend_mvp_design_d01_backend_congelado, docs_superpowers_specs_2026_09_02_frontend_mvp_design_acs_invalidadas [INFERRED 0.85]
- **Fluxo Especificar → Projetar → Tarefas → Plano → Executar → Auditar → Aprender** — _agents_skills_onp_spec_driven_skill_onp_spec_driven, _agents_skills_onp_spec_driven_references_escrevendo_specs_criterio_de_aceite_observavel, _agents_skills_onp_spec_driven_skill_plano_de_execucao, _agents_skills_onp_spec_driven_references_fluxo_fluxo_detalhado, _agents_skills_onp_spec_driven_references_licoes_licoes_aprendidas, _agents_skills_onp_spec_driven_references_constituicao_constituicao [EXTRACTED 1.00]
- **Cadeia de rastreabilidade história → critério de aceite → tarefa → teste** — _agents_skills_onp_spec_driven_skill_codigos_de_rastreio, _agents_skills_onp_spec_driven_references_escrevendo_specs_dado_quando_entao, _agents_skills_onp_spec_driven_references_escrevendo_specs_formato_das_tarefas, _agents_skills_onp_spec_driven_skill_catalogo_de_problemas, _agents_skills_onp_spec_driven_references_licoes_sinais_json [INFERRED 0.85]

## Communities (62 total, 5 thin omitted)

### Community 0 - "Motor onp-spec — CLI e plano"
Cohesion: 0.05
Nodes (87): cmdAssumptions(), cmdEvento(), cmdInit(), cmdNew(), cmdPlano(), cmdResumo(), cmdStatus(), cmdStreamResumo() (+79 more)

### Community 1 - "Motor onp-spec — audit e parsers"
Cohesion: 0.05
Nodes (77): cmdLicoes(), linhaLicao(), auditProject(), CI_ESCALATES, finding(), adicionarLicao(), agora(), caminhoRender() (+69 more)

### Community 2 - "Configuração do build Angular"
Cohesion: 0.05
Nodes (43): architect, prefix, projectType, root, schematics, sourceRoot, build, serve (+35 more)

### Community 3 - "Dependências npm do projeto"
Cohesion: 0.05
Nodes (43): @angular/build, @angular/common, @angular/compiler, @angular/compiler-cli, @angular/core, @angular/forms, @angular/platform-browser, @angular/router (+35 more)

### Community 4 - "Motor onp-spec (.agents) — audit"
Cohesion: 0.11
Nodes (32): auditProject(), CI_ESCALATES, finding(), latestMtime(), loadProject(), grepPattern(), scanAnnotations(), staticDirOf() (+24 more)

### Community 5 - "Motor onp-spec (.agents) — ledger"
Cohesion: 0.13
Nodes (31): cmdResumo(), caminhos(), caminhoStream(), corta(), ESTADOS_FAIXA, homeOnp(), lerEventos(), lerStream() (+23 more)

### Community 6 - "Motor onp-spec (.agents) — CLI"
Cohesion: 0.12
Nodes (28): cmdAssumptions(), cmdEvento(), cmdInit(), cmdNew(), cmdStatus(), cmdStreamResumo(), cmdTarefa(), copyDirIfExists() (+20 more)

### Community 7 - "Motor onp-spec (.agents) — plano"
Cohesion: 0.15
Nodes (26): cmdPlano(), gerarArtefatosPlano(), AGENTES, allowedTools(), descreveTarefa(), ehModeloClaude(), esc(), ESFORCO_CLI (+18 more)

### Community 8 - "Referência de UI: dashboard ACRU"
Cohesion: 0.11
Nodes (27): Add Widget Customization Action, Balance Overview Stacked Bar Chart, Chart Hover Tooltip with Series Breakdown, Bar / Line Chart Type Toggle, Collapsible Sidebar Navigation with Nested Items, Cost Analysis Segmented Bar with Category Legend, Financial Health Radial Gauge (75% of income saved), Non-Focused Bars Dimmed to Grey for Emphasis (+19 more)

### Community 9 - "Bootstrap Angular e interceptors"
Cohesion: 0.12
Nodes (11): Component, App, appConfig, routes, API_BASE_URL, apiUrlInterceptor(), httpErrorInterceptor(), ApiError (+3 more)

### Community 10 - "Feature Ações e frescor de cotação"
Cohesion: 0.23
Nodes (21): P-004 — Nenhuma cotação exibida sem o horário em que foi obtida, Feature: Ações (catálogo global de papéis), Detecção de atualização por comparação de horário, Defasagem de cotação por mercado, Ticker como rótulo do papel, US-012 — Cadastrar ação por ticker e mercado, US-013 — Consultar o catálogo de ações, US-014 — Saber o quão atual está a cotação (+13 more)

### Community 11 - "Motor onp-spec (.agents) — lições"
Cohesion: 0.18
Nodes (20): cmdLicoes(), linhaLicao(), adicionarLicao(), agora(), caminhoRender(), caminhoStore(), campo(), carregarLicoes() (+12 more)

### Community 12 - "Feature Carteiras"
Cohesion: 0.21
Nodes (20): D-01 — Tabela densa com modais e menu de ações por linha, D-02 — Dez carteiras por página, ordenadas por nome e id, D-03 — Obter investidorId do contexto global, D-04 — Carregar todas as páginas de corretoras ativas ao abrir o modal, D-05 — Mercado e corretora imutáveis, D-06 — Nomes repetidos e quantidade ilimitada de carteiras, D-07 — Exigir o nome exato antes de excluir, Design: Carteiras (+12 more)

### Community 13 - "Referência de UI: lançamentos Investidor10"
Cohesion: 0.15
Nodes (20): CTA primário Adicionar Lançamento, Identificação do ativo por logo + ticker (PETR3, VALE3), Campo Buscar ativos na tabela, Integração B3 (importação automática de lançamentos), Filtros do gráfico (periodicidade Mensal, janela 2 Anos, Todos os tipos), Card colapsável de seção (chevron no canto direito), Gráfico Consolidação de aportes (barras compras x vendas), Barra divergente acima/abaixo do zero para compras (verde) e vendas (rosa) (+12 more)

### Community 14 - "Camada HTTP compartilhada das features"
Cohesion: 0.18
Nodes (19): Constituição do projeto (princípios verificáveis), P-001 — Todo requisito tem prova executável, P-002 — Segredos nunca em código, P-003 — Sistema visual flat, sem sombra fora de duas exceções, P-005 — Componente não fala HTTP, T-032 — Listagem de carteiras com paginação, skeleton, vazio e erro, T-021 — Listagem de corretoras com paginação e campos ausentes, US-004 — Ler números e estados sem ambiguidade (+11 more)

### Community 15 - "Referência de UI: análise de resultados"
Cohesion: 0.14
Nodes (18): Adicionar Ativo Action Button, Analise de Resultados Screen, Analyst Estimates Subscription Upsell (Assine Ja), Blurred Paywall Column (Estimativa 2T2026), Compact Number Formatting (K/M/B, pt-BR), Filter Bar (Ativo / Trimestre / Ano), Filtro Avancado Action Button, Green/Red Delta Color Coding with Arrows (+10 more)

### Community 16 - "Referência de UI: agenda de proventos"
Cohesion: 0.13
Nodes (18): Carteira Dropdown Filter, Categorias Dropdown Filter, Category Badge (Pagamentos / Proventos), Company Logo Thumbnail, Conteudos Dropdown Filter, Date-Grouped Event Timeline, Date Range Filter (25/08/2026 - 31/08/2026), Dividend / JCP Payout Event (+10 more)

### Community 17 - "Referência de UI: listagem CRUD"
Cohesion: 0.22
Nodes (16): Active Filter Chips with Clear All, Admin Dashboard Layout with Collapsed Icon Sidebar, Brazilian pt-BR Business Domain (CNPJ, UF), Cascading Location Filters (Estado, Municipio, Bairro), Cliente Entity Fields (Razao Social, Responsavel, CNPJ, UF, Municipio, Bairro), Clientes List Screen Mockup, CRUD List Screen UI Pattern, Data Table with Sortable Columns (+8 more)

### Community 18 - "Referência de UI: carteira cripto"
Cohesion: 0.17
Nodes (16): Account Profile Menu with Notifications, Balance Card with Quick Action Row, Balance Visibility Toggle (Eye Icon), Rounded Card Grid Dashboard Layout, Crypto Wallet Dashboard UI Mockup, Dark Theme with Neon Yellow Accent, Weekly Earnings Bar Chart, Frontend UI Design Reference for Project (+8 more)

### Community 19 - "Motor onp-spec (.agents) — sinais"
Cohesion: 0.30
Nodes (12): DEFAULT_CONFIG, LICOES_DEFAULTS, agora(), caminhoSinais(), carregarSinais(), compactar(), refDoAchado(), registrar() (+4 more)

### Community 20 - "Referência de UI: posições Investidor10"
Cohesion: 0.21
Nodes (15): Adicionar Lancamento Primary CTA, Asset Class Accordion Grouping, B3 Brokerage Integration Entry Point, Buy Recommendation and Asset Score, Zeroed Empty Asset Class Rows, Green/Red Gain-Loss Color Coding, Horizontal Section Tab Navigation, KPI Summary Cards Row (+7 more)

### Community 21 - "Referência de UI: rentabilidade"
Cohesion: 0.25
Nodes (14): B3 Integration and Add Transaction Actions, CDI Benchmark Comparison Indicator, Chart Filter Controls (Period and Asset Type), Empty/Zero Data State, Index Series Legend Toggles (CDI, IPCA, IFIX, IBOV, SMLL, IDIV, IVVB11), KPI Summary Cards Column, Monthly Returns Table by Year, Portfolio Selector (Carteira 1) (+6 more)

### Community 22 - "Referência de UI: metas de investimento"
Cohesion: 0.19
Nodes (14): Metas em Andamento vs Metas Concluidas Sectioning, Criar Nova Meta Action Button, Empty State Message (Nao ha metas concluidas), Estimated Completion Date Projection, Goal Card Layout with Progress Bar, Highlighted Objective Tile (dark navy emphasis), Investment Goal Tracking (Metas), Per-Card Kebab Menu (edit/delete goal) (+6 more)

### Community 23 - "Feature Investidores"
Cohesion: 0.33
Nodes (13): T-019 — Validação de CNPJ no cliente, Conflito 409 direcionado ao campo que colidiu, CPF entra no cadastro e nunca volta, Investidor como raiz do domínio, Feature: Investidores, US-005 — Cadastrar investidor, US-006 — Encontrar e escolher um investidor, US-007 — Excluir investidor (+5 more)

### Community 24 - "Referência de UI: dashboard Status Invest"
Cohesion: 0.21
Nodes (13): Asset Allocation Panel (Composicao), B3 Integration for Portfolio Automation, White Card Grid Layout on Light Background, Status Invest Dashboard Screenshot, Goals Empty State (Metas / Cadastrar), Header Action Bar (Carteira, Adicionar Ativo, Automatizar Carteira), Month-over-Month Comparison Metric, Performance Summary KPI Cards (Rentabilidade, Patrimonio, Proventos) (+5 more)

### Community 25 - "Feature Fundação — shell e contexto"
Cohesion: 0.29
Nodes (12): Feature: Fundação (shell, contexto, erro, design system), Investidor de contexto, Tradução de erro da API para a tela, US-001 — Navegar pelas áreas do sistema, US-002 — Escolher o investidor de contexto, US-003 — Entender o que deu errado, T-003 — Shell de navegação com sidebar e topbar, T-004 — Rotas da aplicação, raiz e página não encontrada (+4 more)

### Community 26 - "Design system FEF Invest"
Cohesion: 0.21
Nodes (12): Checklist de revisão de tela, Estados: skeleton, vazio, erro e cotação defasada, FEF Invest — Design System, Regras de gráficos, Teal só em elemento interativo, Shell: sidebar 240px + topbar 64px, Sistema flat e suas duas exceções, Tabela com coluna travada e overflow horizontal (+4 more)

### Community 27 - "Referência de UI: painel Farmaku"
Cohesion: 0.26
Nodes (12): Best & Least Selling Products Bar Chart with Tooltip, CRUD Admin Panel Layout Pattern, Dark Mode Toggle in Preferences Section, Product Data Table with Search, Filters and Row Actions, Product Stock Overview Donut Chart with Center Total, Farmaku Product Dashboard UI Reference, KPI Stat Card Row (Total Products, Categories, Low Stock, Out of Stock), Navy-on-White Palette with Pastel Semantic Tints (+4 more)

### Community 28 - "Feature Corretoras"
Cohesion: 0.44
Nodes (11): Feature: Corretoras, Cadastro de corretora enriquecido só pelo CNPJ, US-008 — Cadastrar corretora pelo CNPJ, US-009 — Consultar as corretoras cadastradas, US-010 — Buscar corretora pelo CNPJ, US-011 — Excluir corretora, Verificação da CVM falha ≠ corretora irregular, T-017 — Contrato e repositório HTTP de corretoras (+3 more)

### Community 29 - "Feature Dashboard consolidado"
Cohesion: 0.36
Nodes (11): Carregamento progressivo e total parcial, Consolidado por moeda, sem conversão cambial, Feature: Dashboard (consolidado por moeda), US-025 — Ver o consolidado das minhas carteiras, US-026 — Confiar no que o dashboard mostra enquanto ele carrega, US-027 — Ver meu histórico de aportes, T-045 — Facade do consolidado com carregamento progressivo, T-046 — Agregação por moeda e percentual calculado na tela (+3 more)

### Community 30 - "Referência de UI: patrimônio Status Invest"
Cohesion: 0.27
Nodes (11): Header com Busca Global de Ativos, Filtros de Visao (Completo, Patrimonio, Periodo), Estado Quase Vazio (carteira com um unico aporte), Grafico de Evolucao do Patrimonio, Resumo de Desempenho de Patrimonio (KPIs), Barra de Acoes da Carteira (Personalizar, Adicionar Ativo, Automatizar), Navegacao por Abas da Carteira, Toggle de Ocultar Valores (icone de olho) (+3 more)

### Community 31 - "Gramática da especificação"
Cohesion: 0.25
Nodes (9): Ciclo de vida do status da spec, Critério de aceite observável e amigável, Dado / Quando / Então, Pergunta em aberto (Q-xxx), Suposição (ASM-xxx), Template spec.md, Códigos de rastreio US/AC/T/ASM/Q/P, Escrevendo especificações auditáveis (cópia Claude Code) (+1 more)

### Community 32 - "README e instruções do projeto"
Cohesion: 0.22
Nodes (9): Contrato de execução (Claude Code), Motor embarcado onp-spec.mjs (Claude Code), onp-spec-driven (variante Claude Code), Endpoints da API do backend, api-externa-backend-v1 (Spring Boot), README do api-externa-frontend-v1, Arquitetura em camadas (README), Stack do projeto (+1 more)

### Community 33 - "Feature Operações"
Cohesion: 0.44
Nodes (9): Compra usa a cotação do momento, nunca preço digitado, Localizar a carteira do endereço sem endpoint próprio, Feature: Operações (posições, compra, venda, movimentações), Posição recalculada a partir do histórico, US-021 — Comprar ações numa carteira, US-022 — Vender ações de uma carteira, T-037 — Facade da carteira aberta: localizar e carregar posições, T-040 — Modal de compra com seletor de papel filtrado pelo mercado (+1 more)

### Community 34 - "Motor onp-spec (.agents) — scaffold"
Cohesion: 0.44
Nodes (8): detectStyle(), jsFail(), jsHeader(), renderJsPrinciple(), renderJsTest(), renderPyPrinciple(), renderPyTest(), scaffoldTests()

### Community 35 - "Fluxo completo e preset LGPD"
Cohesion: 0.25
Nodes (8): Exemplo: feature entrega-dever-casa, Fluxo detalhado — do zero ao audit limpo, Integração com CI, Tabela de status (onp-spec status), P-001 [DEVE] Nota de um aluno nunca é exposta a outro aluno, Template constituição preset LGPD + Educação, Fluxo detalhado (cópia Claude Code), Template preset LGPD + Educação (cópia Claude Code)

### Community 36 - "Skill onp-spec — visão geral"
Cohesion: 0.29
Nodes (8): Por que isso mata o vibecoding, Auto-dimensionamento das fases, Catálogo de problemas do audit, Contrato de execução inegociável, Degradação graciosa sem node, Motor embarcado onp-spec.mjs, onp-spec-driven (variante Codex), Desenvolvimento spec-anchored

### Community 37 - "Motor onp-spec (.agents) — verify"
Cohesion: 0.43
Nodes (7): extractTags(), gitRev(), parseJsonReport(), parseTap(), resultsByTag(), runVerify(), STATUS_RANK

### Community 38 - "Design system e acessibilidade"
Cohesion: 0.29
Nodes (7): Requisito de acessibilidade AXE / WCAG AA, Camada shared/ (componentes, pipes, utilitários), ASM-D04 — Plus Jakarta Sans entrega tabular-nums, Correções na constituição (P-002 e princípio de design), Corte entre classe CSS e componente compartilhado, D-04 — design system em SCSS + CSS custom properties, Três estados de toda tela de dado (skeleton, vazio, erro)

### Community 39 - "Camadas da arquitetura frontend"
Cohesion: 0.29
Nodes (7): Camada application/ (facades com signals), Camada domain/ (models, enums, ports), Camada presentation/ (features lazy + layout shell), Fluxo spec-driven (specs antes da implementação), Referência da API do backend api-externa-backend-v1, Design do Frontend MVP do Simulador de Carteira, Cada AC vira um teste anotado @spec:AC-xxx

### Community 40 - "Estado com signals e releitura"
Cohesion: 0.33
Nodes (7): Signal Forms (@angular/forms/signals), Estado com signals (computed / linkedSignal), PosicaoService — posição é derivada, não escrita, RN-P02 — preço médio ponderado em compras sucessivas, Facades de feature recarregam a cada entrada na rota, InvestidorContextoStore, Reler do servidor após escrita

### Community 41 - "Regras de operação e correção"
Cohesion: 0.33
Nodes (7): Recurso /operacoes, RN-P03 — não se vende mais do que a posição atual, RN-Q04 — compra e venda usam a cotação do momento, Enum TipoOperacao (COMPRA | VENDA), ASM-D02 — operações cabem na paginação padrão, D-07 — histórico de movimentações só global, D-08 — corrigir lançamento é só excluir, sem editar

### Community 42 - "Contexto do investidor e deep-link"
Cohesion: 0.33
Nodes (7): Lacuna: sem autenticação, ASM-D01 — nenhum investidor tem mais de 100 carteiras, ASM-D03 — backend segue sem autenticação durante o MVP, D-01 — backend congelado, D-05 — investidor de contexto em localStorage + guard, Deep-link para /carteiras/:id, investidor-contexto.guard.ts

### Community 43 - "Constituição verificável"
Cohesion: 0.33
Nodes (6): Constituição — princípios que a máquina verifica, Quatro formas de verificação de princípio, Níveis de obrigação [DEVE]/[RECOMENDADO]/[PODE], Preset LGPD + educação, Rastreabilidade princípio → arquivo → linha, Constituição verificável (cópia Claude Code)

### Community 44 - "Plano de execução e paralelismo"
Cohesion: 0.33
Nodes (6): Formato dos campos de tarefa (Refs / Arquivos / Modelo / Esforço), Faixas paralelas (worktree + branch + contexto limpo), Template tasks.md, Plano de execução com paralelismo opcional, Template tasks.md (cópia Claude Code), Plano de execução com claude headless

### Community 45 - "Lições com lastro mecânico"
Cohesion: 0.33
Nodes (6): Ciclo de vida da lição (candidata → confirmada → quarentena), Dedup exato-após-normalização das lições, Lastro mecânico (LICAO_SEM_LASTRO), Lições — aprendizado com lastro mecânico, Histórico de sinais (.spec/verification/sinais.json), Lições com lastro mecânico (cópia Claude Code)

### Community 46 - "Base da API e proxy de dev"
Cohesion: 0.33
Nodes (6): API_BASE_URL (environment.apiBaseUrl), apiUrlInterceptor, Camada core/ (config, interceptors, guards), Camada infra/ (http + mappers), proxy.conf.json (/api → localhost:8080), Lacuna: sem CORS

### Community 47 - "Fontes de cotação e defasagem"
Cohesion: 0.40
Nodes (6): Recurso /acoes, brapi.dev (cotação BR, ~30 min de defasagem), Twelve Data (cotação US, 0,3 a 2 min de defasagem), Badge âmbar de cotação defasada, CotacaoFrescor, D-06 — limiar de cotação defasada (BR 30 min, US 5 min)

### Community 48 - "Cadastro de corretora por CNPJ"
Cohesion: 0.53
Nodes (6): BrasilAPI / CNPJ, BrasilAPI / CVM, Recurso /corretoras e pipeline de cadastro, ViaCEP, Cadastro de corretora — POST único e lento, D-10 — exibir a message do backend nos erros da CVM

### Community 49 - "Contrato de carteiras e posições"
Cohesion: 0.33
Nodes (6): Recurso /carteiras, nomeEmpresa sempre null, rentabilidadeNaoRealizada, ACs da tentativa anterior que não se sustentam, Sem mappers — DTOs viram models direto, Ticker como rótulo no lugar do nome da empresa

### Community 50 - "Mercado, moeda e consolidado"
Cohesion: 0.33
Nodes (6): Enum Mercado (BR | US), RN-P01 — carteira e ação do mesmo mercado, Lacuna: sem agregados nem saldo em dinheiro, D-03 — dashboard consolidado com BR e US lado a lado, Dashboard custa 2 + N requisições (carregamento progressivo), Compra e venda em modal de formulário

### Community 51 - "Templates de constituição"
Cohesion: 0.40
Nodes (5): Template constituição base v1.1.0, P-001 [DEVE] Todo requisito tem prova executável, P-002 [RECOMENDADO] Segredos nunca em código, P-004 [DEVE] Dados pessoais nunca aparecem em logs, Template constituição base (cópia Claude Code)

### Community 52 - "Erro da API traduzido para a tela"
Cohesion: 0.70
Nodes (5): ApiError (domain/models/api-error.model.ts), httpErrorInterceptor, Erros não mapeados escapam do StandardError, StandardError { timestamp, status, error, message, path, fieldErrors? }, Mapeamento de status HTTP para tratamento na tela

### Community 53 - "Investidores e escopo do MVP"
Cohesion: 0.50
Nodes (5): Exclusão lógica (ativo = false), Recurso /investidores, D-02 — escopo do MVP em 7 features, D-09 — rota raiz é o dashboard, Revalidação do contexto pela lista, não por GET /investidores/{id}

### Community 55 - "Angular CLI e MCP"
Cohesion: 0.50
Nodes (3): npx, angular-cli, @angular/cli

### Community 56 - "Paginação no domínio"
Cohesion: 1.00
Nodes (3): Page<T> (domain/models/page.model.ts), toPageParams() (core/http/http-params.ts), Paginação Page<T> do Spring

### Community 57 - "Atualização silenciosa de cotação"
Cohesion: 1.00
Nodes (3): PUT /acoes/{id}/atualizar-cotacao (falha silenciosa), RN-Q05 — fonte indisponível tem mensagem própria, Detectar atualização de cotação que não atualizou

## Ambiguous Edges - Review These
- `Frontend UI Design Reference for Angular App` → `Personal Finance Dashboard Pattern`  [AMBIGUOUS]
  docs/references/1d60937832a1a7f4028b1737834740f2.webp · relation: conceptually_related_to
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
- `Template placeholder do Angular CLI (app.html)` → `Tokens de cor`  [AMBIGUOUS]
  src/app/app.html · relation: conceptually_related_to
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
- `Best & Least Selling Products Bar Chart with Tooltip` → `Farmaku Product Dashboard UI Reference`  [AMBIGUOUS]
  docs/references/eb7620cd3e178bd6059d850dbf2d2377.webp · relation: conceptually_related_to
- `Header com Busca Global de Ativos` → `Barra de Acoes da Carteira (Personalizar, Adicionar Ativo, Automatizar)`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092809.png · relation: semantically_similar_to
- `D-02 — Dez carteiras por página, ordenadas por nome e id` → `Consolidado por moeda, sem conversão cambial`  [AMBIGUOUS]
  .spec/features/dashboard/spec.md · relation: conceptually_related_to
- `Camada infra/ (http + mappers)` → `Sem mappers — DTOs viram models direto`  [AMBIGUOUS]
  docs/superpowers/specs/2026-09-02-frontend-mvp-design.md · relation: conceptually_related_to

## Knowledge Gaps
- **171 isolated node(s):** `FieldError`, `Page`, `Mercado`, `TipoOperacao`, `__dirname` (+166 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Frontend UI Design Reference for Angular App` and `Personal Finance Dashboard Pattern`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
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
- **What is the exact relationship between `Template placeholder do Angular CLI (app.html)` and `Tokens de cor`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._