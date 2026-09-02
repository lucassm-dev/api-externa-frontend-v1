# api-externa-frontend-v1

Frontend Angular do Sistema de Simulação de Carteira de Ações. Consome a API REST
do [api-externa-backend-v1](https://github.com/lucassm-dev/api-externa-backend-v1)
(Spring Boot), que por sua vez integra APIs externas (CNPJ, CEP, CVM, cotações BR/US).

## Stack

- Angular 22 (standalone, signals, zoneless)
- TypeScript strict, SCSS
- Vitest (testes unitários), Prettier
- Fluxo de especificação `onp-spec-driven` (`.spec/`)

## Rodando

O backend precisa estar no ar em `http://localhost:8080`:

```
git clone https://github.com/lucassm-dev/api-externa-backend-v1
cd api-externa-backend-v1 && docker compose up -d && ./mvnw spring-boot:run
```

Depois, na raiz deste projeto:

```
npm install
npm start          # http://localhost:4200
```

O dev server faz proxy de `/api/*` para `http://localhost:8080/*`
(`proxy.conf.json`), então não é preciso configurar CORS no backend.

## Comandos

| Comando         | O que faz                                  |
| --------------- | ------------------------------------------ |
| `npm start`     | Dev server em :4200 com proxy para a API    |
| `npm run build` | Build de produção                           |
| `npm test`      | Testes unitários (Vitest)                   |

## Arquitetura

Camadas sob `src/app/`, espelhando a separação usada no backend. A dependência
sempre aponta para dentro: `presentation → application → domain ← infra`.

| Pasta          | Responsabilidade                                                      |
| -------------- | --------------------------------------------------------------------- |
| `domain/`      | Contratos puros: models, enums e ports (interfaces de repositório)      |
| `infra/`       | Implementação dos ports: repositórios HTTP (sem camada de mappers)      |
| `application/` | Casos de uso / facades com signals — orquestram estado das features     |
| `presentation/`| Telas (`features/`) e shell da aplicação (`layout/`)                    |
| `core/`        | Infraestrutura transversal: config da API, interceptors, guards         |
| `shared/`      | Componentes, pipes, directives e utilitários reutilizáveis              |

## API do backend

Base: `/api` (proxy) — em produção, `environment.apiBaseUrl`.

| Recurso     | Endpoints                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------- |
| Investidores| `POST /investidores`, `GET /investidores`, `GET /investidores/{id}`, `DELETE /investidores/{id}` |
| Corretoras  | `POST /corretoras`, `GET /corretoras`, `GET /corretoras/{id}`, `GET /corretoras/cnpj/{cnpj}`, `DELETE /corretoras/{id}` |
| Ações       | `POST /acoes`, `GET /acoes`, `GET /acoes/ticker/{ticker}`, `PUT /acoes/{id}/atualizar-cotacao`, `DELETE /acoes/{ticker}` |
| Carteiras   | `POST /carteiras`, `GET /carteiras?investidorId=`, `PATCH /carteiras/{id}`, `DELETE /carteiras/{id}`, `GET /carteiras/{id}/posicoes` |
| Operações   | `POST /operacoes/compra`, `POST /operacoes/venda`, `GET /operacoes?investidorId=`, `PUT /operacoes/{id}`, `DELETE /operacoes/{id}` |

Listagens são paginadas (`Page<T>` do Spring) e erros seguem o `StandardError`
do backend — ambos tipados em `src/app/domain/models/`.

Swagger do backend: http://localhost:8080/swagger-ui.html

## Especificações

Features são especificadas em `.spec/features/` antes de implementadas
(fluxo `onp-spec-driven`). Referências visuais em `docs/references/`.
