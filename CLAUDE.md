# api-externa-frontend-v1

Frontend Angular 22 do Sistema de Simulação de Carteira de Ações. Consome a API
REST do backend Spring Boot `api-externa-backend-v1` (repo separado, roda em
`http://localhost:8080`).

## Fluxo de trabalho deste projeto

- Features são **especificadas antes de implementadas** (skill `onp-spec-driven`,
  specs em `.spec/features/`). Não crie tela ou caso de uso sem spec correspondente.
- Referências visuais do produto estão em `docs/references/`.

## Comandos

- `npm start` — dev server em :4200 com proxy `/api` → `localhost:8080`
- `npm run build` — build de produção
- `npm test` — Vitest

## Arquitetura em camadas

Sob `src/app/`, espelhando a separação do backend. A dependência aponta sempre
para dentro: `presentation → application → domain ← infra`.

- `domain/` — contratos puros, **sem imports do Angular**: `models/` (tipos que
  espelham os DTOs do backend), `enums/`, `ports/` (interfaces dos repositórios).
- `infra/` — implementação dos ports: `http/` (repositórios que falam com a API).
  O model espelha o DTO; quando o tipo do fio não serve ao domínio (data como
  string, código numérico como rótulo), o próprio repositório normaliza na
  entrada. **Não existe camada de mappers** — o precedente é `ApiError`, que o
  `httpErrorInterceptor` converte a partir do `StandardError`.
- `application/` — casos de uso / facades com signals; é quem a tela injeta.
- `presentation/` — `features/` (telas, lazy-loaded por rota) e `layout/` (shell).
- `core/` — infraestrutura transversal: `config/` (`API_BASE_URL`), `http/`
  (interceptors), `guards/`.
- `shared/` — componentes, pipes, directives e utilitários reutilizáveis.

Regras:

- Componente **nunca** injeta `HttpClient` nem repositório de `infra/` direto —
  passa por `application/`.
- `application/` depende de `domain/ports`, não da implementação em `infra/`.
- Nada em `domain/` importa de `infra/`, `application/` ou `presentation/`.

## Conexão com o backend

- Os repositórios declaram apenas o caminho do recurso (`/corretoras`);
  `apiUrlInterceptor` prefixa com `API_BASE_URL` (`environment.apiBaseUrl`).
- Em dev, `apiBaseUrl` é `/api` e o `proxy.conf.json` encaminha para
  `localhost:8080` — o backend **não tem CORS configurado**, então nunca chame
  `http://localhost:8080` direto do browser.
- `httpErrorInterceptor` converte qualquer falha no `ApiError`
  (`domain/models/api-error.model.ts`), que já carrega `fieldErrors` do
  `StandardError` do backend. Trate `ApiError`, nunca `HttpErrorResponse`.
- Listagens do backend são `Page<T>` do Spring (`domain/models/page.model.ts`);
  monte os query params de paginação com `toPageParams()` de
  `core/http/http-params.ts`.
- Endpoints disponíveis: ver tabela no `README.md` ou o Swagger em
  http://localhost:8080/swagger-ui.html

---

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
