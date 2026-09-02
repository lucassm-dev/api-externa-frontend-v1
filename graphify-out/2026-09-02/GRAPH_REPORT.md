# Graph Report - api-externa-frontend-v1  (2026-09-02)

## Corpus Check
- 103 files · ~110,682 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 774 nodes · 1500 edges · 38 communities (34 shown, 4 thin omitted)
- Extraction: 91% EXTRACTED · 8% INFERRED · 1% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.86)
- Token cost: 646,004 input · 0 output

## Community Hubs (Navigation)
- onp-spec CLI (Claude Code)
- onp-spec CLI (Codex)
- Configuração do Workspace Angular
- Dependências Angular 22
- Motor de Audit (Codex)
- Motor de Audit (Claude Code)
- Ledger de Execução (Codex)
- Ledger de Execução (Claude Code)
- Plano Paralelo (Codex)
- Plano Paralelo (Claude Code)
- Mockup Dashboard ACRU
- Bootstrap da Aplicação Angular
- Lançamentos Investidor10
- Análise de Resultados Status Invest
- Radar de Proventos Status Invest
- Design System FEF Invest
- Mockup CRUD de Clientes
- Mockup Carteira Cripto
- Posições Investidor10
- Rentabilidade Investidor10
- Metas Investidor10
- Anatomia da Spec
- Dashboard Status Invest
- Mockup Estoque Farmaku
- Patrimônio Status Invest
- Tarefas e Faixas Paralelas
- Constituição Verificável
- Prova Executável e Sinais
- Scaffold de Testes
- Instruções do Projeto
- Preset LGPD e Educação
- Integração com o Backend
- Lições com Lastro Mecânico
- Paginação Page<T>
- Angular CLI MCP
- Enum Mercado
- Enum TipoOperacao
- Environments

## God Nodes (most connected - your core abstractions)
1. `run()` - 25 edges
2. `run()` - 25 edges
3. `ACRU Finance Dashboard UI Reference` - 17 edges
4. `Clientes List Screen Mockup` - 15 edges
5. `Crypto Wallet Dashboard UI Mockup` - 13 edges
6. `onp-spec-driven (variante Codex)` - 12 edges
7. `cmdLicoes()` - 11 edges
8. `cmdLicoes()` - 11 edges
9. `Investidor10 Posicoes Screenshot` - 11 edges
10. `Quarterly Earnings Comparison Table` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Critério de aceite observável e amigável` --semantically_similar_to--> `Escrevendo especificações auditáveis (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/escrevendo-specs.md → .claude/skills/onp-spec-driven/references/escrevendo-specs.md
- `onp-spec-driven (variante Codex)` --semantically_similar_to--> `onp-spec-driven (variante Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/SKILL.md → .claude/skills/onp-spec-driven/SKILL.md
- `Checklist de revisão de tela` --semantically_similar_to--> `Catálogo de problemas do audit`  [INFERRED] [semantically similar]
  docs/design-system-fef-invest.md → .agents/skills/onp-spec-driven/SKILL.md
- `Constituição — princípios que a máquina verifica` --semantically_similar_to--> `Constituição verificável (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/constituicao.md → .claude/skills/onp-spec-driven/references/constituicao.md
- `Fluxo detalhado — do zero ao audit limpo` --semantically_similar_to--> `Fluxo detalhado (cópia Claude Code)`  [INFERRED] [semantically similar]
  .agents/skills/onp-spec-driven/references/fluxo.md → .claude/skills/onp-spec-driven/references/fluxo.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fluxo Especificar → Projetar → Tarefas → Plano → Executar → Auditar → Aprender** — _agents_skills_onp_spec_driven_skill_onp_spec_driven, _agents_skills_onp_spec_driven_references_escrevendo_specs_criterio_de_aceite_observavel, _agents_skills_onp_spec_driven_skill_plano_de_execucao, _agents_skills_onp_spec_driven_references_fluxo_fluxo_detalhado, _agents_skills_onp_spec_driven_references_licoes_licoes_aprendidas, _agents_skills_onp_spec_driven_references_constituicao_constituicao [EXTRACTED 1.00]
- **Cadeia de rastreabilidade história → critério de aceite → tarefa → teste** — _agents_skills_onp_spec_driven_skill_codigos_de_rastreio, _agents_skills_onp_spec_driven_references_escrevendo_specs_dado_quando_entao, _agents_skills_onp_spec_driven_references_escrevendo_specs_formato_das_tarefas, _agents_skills_onp_spec_driven_skill_catalogo_de_problemas, _agents_skills_onp_spec_driven_references_licoes_sinais_json [INFERRED 0.85]
- **Arquitetura em camadas do frontend e sua ligação com a API** — claude_arquitetura_em_camadas, claude_regras_de_dependencia, readme_arquitetura_em_camadas, claude_conexao_com_backend, claude_api_url_interceptor, claude_http_error_interceptor, claude_paginacao_page_model [EXTRACTED 1.00]

## Communities (38 total, 4 thin omitted)

### Community 0 - "onp-spec CLI (Claude Code)"
Cohesion: 0.06
Nodes (81): cmdAssumptions(), cmdEvento(), cmdInit(), cmdLicoes(), cmdNew(), cmdPlano(), cmdStatus(), cmdStreamResumo() (+73 more)

### Community 1 - "onp-spec CLI (Codex)"
Cohesion: 0.07
Nodes (65): cmdAssumptions(), cmdInit(), cmdLicoes(), cmdNew(), cmdStatus(), cmdStreamResumo(), cmdTarefa(), copyDirIfExists() (+57 more)

### Community 2 - "Configuração do Workspace Angular"
Cohesion: 0.05
Nodes (43): architect, prefix, projectType, root, schematics, sourceRoot, build, serve (+35 more)

### Community 3 - "Dependências Angular 22"
Cohesion: 0.05
Nodes (43): @angular/build, @angular/common, @angular/compiler, @angular/compiler-cli, @angular/core, @angular/forms, @angular/platform-browser, @angular/router (+35 more)

### Community 4 - "Motor de Audit (Codex)"
Cohesion: 0.11
Nodes (32): auditProject(), CI_ESCALATES, finding(), latestMtime(), loadProject(), grepPattern(), scanAnnotations(), staticDirOf() (+24 more)

### Community 5 - "Motor de Audit (Claude Code)"
Cohesion: 0.12
Nodes (30): auditProject(), CI_ESCALATES, finding(), latestMtime(), loadProject(), grepPattern(), scanAnnotations(), staticDirOf() (+22 more)

### Community 6 - "Ledger de Execução (Codex)"
Cohesion: 0.13
Nodes (32): cmdEvento(), cmdResumo(), caminhos(), caminhoStream(), corta(), ESTADOS_FAIXA, homeOnp(), lerEventos() (+24 more)

### Community 7 - "Ledger de Execução (Claude Code)"
Cohesion: 0.14
Nodes (27): cmdResumo(), caminhos(), caminhoStream(), corta(), ESTADOS_FAIXA, homeOnp(), lerStream(), MAX_EXECUCOES (+19 more)

### Community 8 - "Plano Paralelo (Codex)"
Cohesion: 0.15
Nodes (27): cmdPlano(), gerarArtefatosPlano(), AGENTES, allowedTools(), descreveTarefa(), ehModeloClaude(), esc(), ESFORCO_CLI (+19 more)

### Community 9 - "Plano Paralelo (Claude Code)"
Cohesion: 0.14
Nodes (26): cmdTarefa(), definirCampoTarefa(), AGENTES, allowedTools(), descreveTarefa(), ehModeloClaude(), esc(), ESFORCO_CLI (+18 more)

### Community 10 - "Mockup Dashboard ACRU"
Cohesion: 0.11
Nodes (27): Add Widget Customization Action, Balance Overview Stacked Bar Chart, Chart Hover Tooltip with Series Breakdown, Bar / Line Chart Type Toggle, Collapsible Sidebar Navigation with Nested Items, Cost Analysis Segmented Bar with Category Legend, Financial Health Radial Gauge (75% of income saved), Non-Focused Bars Dimmed to Grey for Emphasis (+19 more)

### Community 11 - "Bootstrap da Aplicação Angular"
Cohesion: 0.12
Nodes (11): Component, App, appConfig, routes, API_BASE_URL, apiUrlInterceptor(), httpErrorInterceptor(), ApiError (+3 more)

### Community 12 - "Lançamentos Investidor10"
Cohesion: 0.15
Nodes (20): CTA primário Adicionar Lançamento, Identificação do ativo por logo + ticker (PETR3, VALE3), Campo Buscar ativos na tabela, Integração B3 (importação automática de lançamentos), Filtros do gráfico (periodicidade Mensal, janela 2 Anos, Todos os tipos), Card colapsável de seção (chevron no canto direito), Gráfico Consolidação de aportes (barras compras x vendas), Barra divergente acima/abaixo do zero para compras (verde) e vendas (rosa) (+12 more)

### Community 13 - "Análise de Resultados Status Invest"
Cohesion: 0.14
Nodes (18): Adicionar Ativo Action Button, Analise de Resultados Screen, Analyst Estimates Subscription Upsell (Assine Ja), Blurred Paywall Column (Estimativa 2T2026), Compact Number Formatting (K/M/B, pt-BR), Filter Bar (Ativo / Trimestre / Ano), Filtro Avancado Action Button, Green/Red Delta Color Coding with Arrows (+10 more)

### Community 14 - "Radar de Proventos Status Invest"
Cohesion: 0.13
Nodes (18): Carteira Dropdown Filter, Categorias Dropdown Filter, Category Badge (Pagamentos / Proventos), Company Logo Thumbnail, Conteudos Dropdown Filter, Date-Grouped Event Timeline, Date Range Filter (25/08/2026 - 31/08/2026), Dividend / JCP Payout Event (+10 more)

### Community 15 - "Design System FEF Invest"
Cohesion: 0.17
Nodes (16): Arquitetura em camadas do frontend, httpErrorInterceptor e ApiError, Regras de dependência entre camadas, Checklist de revisão de tela, Estados: skeleton, vazio, erro e cotação defasada, FEF Invest — Design System, Regras de gráficos, Teal só em elemento interativo (+8 more)

### Community 16 - "Mockup CRUD de Clientes"
Cohesion: 0.22
Nodes (16): Active Filter Chips with Clear All, Admin Dashboard Layout with Collapsed Icon Sidebar, Brazilian pt-BR Business Domain (CNPJ, UF), Cascading Location Filters (Estado, Municipio, Bairro), Cliente Entity Fields (Razao Social, Responsavel, CNPJ, UF, Municipio, Bairro), Clientes List Screen Mockup, CRUD List Screen UI Pattern, Data Table with Sortable Columns (+8 more)

### Community 17 - "Mockup Carteira Cripto"
Cohesion: 0.17
Nodes (16): Account Profile Menu with Notifications, Balance Card with Quick Action Row, Balance Visibility Toggle (Eye Icon), Rounded Card Grid Dashboard Layout, Crypto Wallet Dashboard UI Mockup, Dark Theme with Neon Yellow Accent, Weekly Earnings Bar Chart, Frontend UI Design Reference for Project (+8 more)

### Community 18 - "Posições Investidor10"
Cohesion: 0.21
Nodes (15): Adicionar Lancamento Primary CTA, Asset Class Accordion Grouping, B3 Brokerage Integration Entry Point, Buy Recommendation and Asset Score, Zeroed Empty Asset Class Rows, Green/Red Gain-Loss Color Coding, Horizontal Section Tab Navigation, KPI Summary Cards Row (+7 more)

### Community 19 - "Rentabilidade Investidor10"
Cohesion: 0.25
Nodes (14): B3 Integration and Add Transaction Actions, CDI Benchmark Comparison Indicator, Chart Filter Controls (Period and Asset Type), Empty/Zero Data State, Index Series Legend Toggles (CDI, IPCA, IFIX, IBOV, SMLL, IDIV, IVVB11), KPI Summary Cards Column, Monthly Returns Table by Year, Portfolio Selector (Carteira 1) (+6 more)

### Community 20 - "Metas Investidor10"
Cohesion: 0.19
Nodes (14): Metas em Andamento vs Metas Concluidas Sectioning, Criar Nova Meta Action Button, Empty State Message (Nao ha metas concluidas), Estimated Completion Date Projection, Goal Card Layout with Progress Bar, Highlighted Objective Tile (dark navy emphasis), Investment Goal Tracking (Metas), Per-Card Kebab Menu (edit/delete goal) (+6 more)

### Community 21 - "Anatomia da Spec"
Cohesion: 0.18
Nodes (13): Ciclo de vida do status da spec, Critério de aceite observável e amigável, Dado / Quando / Então, Pergunta em aberto (Q-xxx), Suposição (ASM-xxx), Template spec.md, Auto-dimensionamento das fases, Códigos de rastreio US/AC/T/ASM/Q/P (+5 more)

### Community 22 - "Dashboard Status Invest"
Cohesion: 0.21
Nodes (13): Asset Allocation Panel (Composicao), B3 Integration for Portfolio Automation, White Card Grid Layout on Light Background, Status Invest Dashboard Screenshot, Goals Empty State (Metas / Cadastrar), Header Action Bar (Carteira, Adicionar Ativo, Automatizar Carteira), Month-over-Month Comparison Metric, Performance Summary KPI Cards (Rentabilidade, Patrimonio, Proventos) (+5 more)

### Community 23 - "Mockup Estoque Farmaku"
Cohesion: 0.26
Nodes (12): Best & Least Selling Products Bar Chart with Tooltip, CRUD Admin Panel Layout Pattern, Dark Mode Toggle in Preferences Section, Product Data Table with Search, Filters and Row Actions, Product Stock Overview Donut Chart with Center Total, Farmaku Product Dashboard UI Reference, KPI Stat Card Row (Total Products, Categories, Low Stock, Out of Stock), Navy-on-White Palette with Pastel Semantic Tints (+4 more)

### Community 24 - "Patrimônio Status Invest"
Cohesion: 0.27
Nodes (11): Header com Busca Global de Ativos, Filtros de Visao (Completo, Patrimonio, Periodo), Estado Quase Vazio (carteira com um unico aporte), Grafico de Evolucao do Patrimonio, Resumo de Desempenho de Patrimonio (KPIs), Barra de Acoes da Carteira (Personalizar, Adicionar Ativo, Automatizar), Navegacao por Abas da Carteira, Toggle de Ocultar Valores (icone de olho) (+3 more)

### Community 25 - "Tarefas e Faixas Paralelas"
Cohesion: 0.20
Nodes (10): Formato dos campos de tarefa (Refs / Arquivos / Modelo / Esforço), Faixas paralelas (worktree + branch + contexto limpo), Fluxo detalhado — do zero ao audit limpo, Integração com CI, Tabela de status (onp-spec status), Template tasks.md, Plano de execução com paralelismo opcional, Fluxo detalhado (cópia Claude Code) (+2 more)

### Community 26 - "Constituição Verificável"
Cohesion: 0.22
Nodes (9): Constituição — princípios que a máquina verifica, Quatro formas de verificação de princípio, Níveis de obrigação [DEVE]/[RECOMENDADO]/[PODE], Preset LGPD + educação, Rastreabilidade princípio → arquivo → linha, Constituição verificável (cópia Claude Code), P-002 [RECOMENDADO] Segredos nunca em código (projeto), Stack do projeto (+1 more)

### Community 27 - "Prova Executável e Sinais"
Cohesion: 0.25
Nodes (9): Por que isso mata o vibecoding, Histórico de sinais (.spec/verification/sinais.json), Template constituição base v1.1.0, P-001 [DEVE] Todo requisito tem prova executável, Catálogo de problemas do audit, Contrato de execução inegociável, Template constituição base (cópia Claude Code), Constituição do projeto api-externa-frontend-v1 (+1 more)

### Community 28 - "Scaffold de Testes"
Cohesion: 0.44
Nodes (8): detectStyle(), jsFail(), jsHeader(), renderJsPrinciple(), renderJsTest(), renderPyPrinciple(), renderPyTest(), scaffoldTests()

### Community 29 - "Instruções do Projeto"
Cohesion: 0.29
Nodes (7): Escrevendo especificações auditáveis (cópia Claude Code), Contrato de execução (Claude Code), Motor embarcado onp-spec.mjs (Claude Code), onp-spec-driven (variante Claude Code), Convenções Angular v22 do projeto, Feature só existe com spec (fluxo do projeto), api-externa-frontend-v1 (instruções do projeto)

### Community 30 - "Preset LGPD e Educação"
Cohesion: 0.33
Nodes (6): Exemplo: feature entrega-dever-casa, P-002 [RECOMENDADO] Segredos nunca em código, P-001 [DEVE] Nota de um aluno nunca é exposta a outro aluno, P-004 [DEVE] Dados pessoais nunca aparecem em logs, Template constituição preset LGPD + Educação, Template preset LGPD + Educação (cópia Claude Code)

### Community 31 - "Integração com o Backend"
Cohesion: 0.47
Nodes (6): apiUrlInterceptor, Conexão com o backend (proxy /api), Paginação Page<T> e toPageParams(), Endpoints da API do backend, api-externa-backend-v1 (Spring Boot), README do api-externa-frontend-v1

### Community 32 - "Lições com Lastro Mecânico"
Cohesion: 0.40
Nodes (5): Ciclo de vida da lição (candidata → confirmada → quarentena), Dedup exato-após-normalização das lições, Lastro mecânico (LICAO_SEM_LASTRO), Lições — aprendizado com lastro mecânico, Lições com lastro mecânico (cópia Claude Code)

### Community 34 - "Angular CLI MCP"
Cohesion: 0.50
Nodes (3): npx, angular-cli, @angular/cli

## Ambiguous Edges - Review These
- `Preset LGPD + educação` → `P-002 [RECOMENDADO] Segredos nunca em código (projeto)`  [AMBIGUOUS]
  .spec/constituicao.md · relation: conceptually_related_to
- `Tokens de cor` → `Template placeholder do Angular CLI (app.html)`  [AMBIGUOUS]
  src/app/app.html · relation: conceptually_related_to
- `Personal Finance Dashboard Pattern` → `Frontend UI Design Reference for Angular App`  [AMBIGUOUS]
  docs/references/1d60937832a1a7f4028b1737834740f2.webp · relation: conceptually_related_to
- `Admin Dashboard Layout with Collapsed Icon Sidebar` → `Frontend UI Reference Spec for api-externa-frontend`  [AMBIGUOUS]
  docs/references/a6c73fd425530d01b446d08a8c24be3e.webp · relation: conceptually_related_to
- `Farmaku Product Dashboard UI Reference` → `Best & Least Selling Products Bar Chart with Tooltip`  [AMBIGUOUS]
  docs/references/eb7620cd3e178bd6059d850dbf2d2377.webp · relation: conceptually_related_to
- `Rounded Card Grid Dashboard Layout` → `Frontend UI Design Reference for Project`  [AMBIGUOUS]
  docs/references/original-e1585af222b84556e6be4d30c52f5681.webp · relation: conceptually_related_to
- `Ideal vs Actual Allocation Percentage` → `Buy Recommendation and Asset Score`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092407.png · relation: conceptually_related_to
- `Monthly Returns Table by Year` → `Empty/Zero Data State`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092505.png · relation: conceptually_related_to
- `B3 Integration and Add Transaction Actions` → `Empty/Zero Data State`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092505.png · relation: conceptually_related_to
- `Filtros do gráfico (periodicidade Mensal, janela 2 Anos, Todos os tipos)` → `Colunas do lançamento (Ativo, Tipo de investimento, Tipo de ordem, Quantidade, Preço unitário, Total, Quantidade Total, Data do lançamento, Fonte, Opções)`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092544.png · relation: conceptually_related_to
- `Media de Proventos Mensais Goal (Acoes, FIIs, Stocks, BDRs)` → `Estimated Completion Date Projection`  [AMBIGUOUS]
  docs/references/investidor10/Captura de tela 2026-08-31 092613.png · relation: conceptually_related_to
- `Barra de Acoes da Carteira (Personalizar, Adicionar Ativo, Automatizar)` → `Header com Busca Global de Ativos`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092809.png · relation: semantically_similar_to
- `Analyst Estimates Subscription Upsell (Assine Ja)` → `UI Reference for Angular Frontend Implementation`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092906.png · relation: conceptually_related_to
- `B3 Ticker Dataset (NORD3, PASS3, VULC3, CXSE3, BBML3, BBSE3, HBTS5, PATI4, UCAS3)` → `UI Reference for Angular Frontend Implementation`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092906.png · relation: semantically_similar_to
- `Date Range Filter (25/08/2026 - 31/08/2026)` → `Date-Grouped Event Timeline`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092950.png · relation: conceptually_related_to
- `Company Logo Thumbnail` → `US Tickers (TRST, UFCS, WSBC)`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 092950.png · relation: conceptually_related_to
- `Status Invest Dashboard Screenshot` → `B3 Integration for Portfolio Automation`  [AMBIGUOUS]
  docs/references/status_invest/Captura de tela 2026-08-31 093015.png · relation: references

## Knowledge Gaps
- **155 isolated node(s):** `__dirname`, `TEMPLATES_DIR`, `SKILL_DIR_POR_AGENTE`, `SKILLS_DIR_PROJETO`, `CI_ESCALATES` (+150 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Preset LGPD + educação` and `P-002 [RECOMENDADO] Segredos nunca em código (projeto)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Tokens de cor` and `Template placeholder do Angular CLI (app.html)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Personal Finance Dashboard Pattern` and `Frontend UI Design Reference for Angular App`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Admin Dashboard Layout with Collapsed Icon Sidebar` and `Frontend UI Reference Spec for api-externa-frontend`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Farmaku Product Dashboard UI Reference` and `Best & Least Selling Products Bar Chart with Tooltip`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Rounded Card Grid Dashboard Layout` and `Frontend UI Design Reference for Project`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Ideal vs Actual Allocation Percentage` and `Buy Recommendation and Asset Score`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._