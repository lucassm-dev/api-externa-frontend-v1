# Plano de execução — fundacao

> gerado por `onp-spec plano` em 2026-09-03 00:25 — NÃO edite à mão;
> mudou tasks.md ou a config? Regenere: `onp-spec plano fundacao --paralelizar T-001,T-003,T-004,T-005,T-008`

## Resumo — o que vai acontecer

- **11 tarefa(s) pendente(s)**: 5 em 5 faixa(s) paralela(s) + 6 sequencial(is)
- **seleção do usuário**: paralelizar só T-001, T-003, T-004, T-005, T-008 — as demais rodam uma após a outra, ao final
- **1 faixa = 1 worktree + 1 branch + 1 janela de contexto limpa** — faixas não compartilham nenhum arquivo entre si
- prefere outra seleção ou uma após a outra? Regenere com `onp-spec plano fundacao --paralelizar T-xxx,T-yyy` ou `--sequencial`
- tudo acontece na branch de trabalho `spec/fundacao`; levar para a main é decisão sua

## Faixas e ondas

### Onda 1 — faixa-1 ∥ faixa-2 ∥ faixa-3

#### faixa-1 — branch `spec/fundacao-faixa-1` — worktree `../onp-worktrees/api-externa-frontend-v1-fundacao-faixa-1`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-001 | Tokens, base e tipografia do design system | `gpt-5.6-terra` | medium | `src/styles/_tokens.scss`, `src/styles/_base.scss`, `src/styles/_tipografia.scss`, `src/styles/index.scss`, `src/styles.scss` |

#### faixa-2 — branch `spec/fundacao-faixa-2` — worktree `../onp-worktrees/api-externa-frontend-v1-fundacao-faixa-2`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-003 | Shell de navegação com sidebar e topbar | `gpt-5.6-terra` | medium | `src/app/presentation/layout/shell/shell.ts`, `src/app/presentation/layout/shell/shell.spec.ts`, `src/app/app.ts`, `src/app/app.html`, `src/app/app.scss`, `src/app/app.spec.ts` |

#### faixa-3 — branch `spec/fundacao-faixa-3` — worktree `../onp-worktrees/api-externa-frontend-v1-fundacao-faixa-3`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-004 | Rotas da aplicação, raiz e página não encontrada | `gpt-5.6-terra` | low | `src/app/app.routes.ts`, `src/app/app.routes.spec.ts`, `src/app/presentation/features/nao-encontrado/nao-encontrado.ts` |

### Onda 2 — faixa-4 ∥ faixa-5

#### faixa-4 — branch `spec/fundacao-faixa-4` — worktree `../onp-worktrees/api-externa-frontend-v1-fundacao-faixa-4`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-005 | Store do investidor de contexto com persistência e revalidação | `gpt-5.6-terra` | high | `src/app/application/investidor-contexto.store.ts`, `src/app/application/investidor-contexto.store.spec.ts` |

#### faixa-5 — branch `spec/fundacao-faixa-5` — worktree `../onp-worktrees/api-externa-frontend-v1-fundacao-faixa-5`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-008 | Configuração de HTTP, base da API e paginação | `gpt-5.6-terra` | low | `src/app/app.config.ts`, `src/app/core/config/api.config.ts`, `src/app/core/http/api-url-interceptor.ts`, `src/app/core/http/http-params.ts`, `src/app/domain/models/page.model.ts` |

## Tarefas sequenciais (após as ondas, na árvore principal)

| tarefa | título | modelo | esforço | por que sequencial |
|---|---|---|---|---|
| T-002 | Classes de controle, tabela e card | `gpt-5.6-terra` | medium | fora da seleção do usuário |
| T-006 | Seletor de investidor na topbar | `gpt-5.6-terra` | medium | fora da seleção do usuário |
| T-007 | Guard de contexto nas áreas que dependem de investidor | `gpt-5.6-terra` | medium | fora da seleção do usuário |
| T-009 | Tradução de erro da API para a tela | `gpt-5.6-terra` | high | fora da seleção do usuário |
| T-010 | Componentes compartilhados de estado e navegação | `gpt-5.6-terra` | high | fora da seleção do usuário |
| T-011 | Frescor de cotação e badge de defasagem | `gpt-5.6-terra` | medium | fora da seleção do usuário |

## Gestão de branches e commits

1. branch de trabalho `spec/fundacao` criada do ponto atual (se ainda não existir)
2. cada faixa nasce dela como branch própria e roda no seu worktree — **1 tarefa = 1 commit** (`T-xxx feature: título`)
3. terminou a onda → merge `--no-ff` de cada faixa de volta, na ordem; conflito interrompe a faixa e pede resolução humana
4. faixa mesclada → worktree removido, branch apagada, tarefa marcada `[concluida]` no tasks.md
5. gate final na branch de trabalho: `onp-spec verify fundacao` + `onp-spec audit --ci` — **exit 0 ou não está pronto**

## Como executar

### ▶ Execução — Codex headless (codex exec)

```bash
bash .spec/features/fundacao/executar-tarefas.sh
```

Cada faixa roda `codex exec` com **janela de contexto limpa**, no seu worktree, com
`--model` e `model_reasoning_effort` já definidos por tarefa e sandbox `workspace-write`. Os prompts exatos estão
embutidos no script — quer rodar uma faixa na mão, é só copiá-los de lá.
Logs: `../onp-worktrees/api-externa-frontend-v1-fundacao-logs/`.

**Confirmação de custos — antes de executar**: os modelos e esforços por
tarefa estão nas tabelas acima; o agente CONFIRMA com o usuário se estão
dentro da licença/cota dele (modelo forte + esforço alto torra tokens).
Para gastar menos: `onp-spec plano fundacao --modelo gpt-5.6-luna --esforco baixo`
(tudo) ou por tarefa `onp-spec tarefa fundacao T-xxx --modelo <m> --esforco <nível>` — e regenere o plano.

### 📣 Acompanhamento — tabela + resumo no chat (a cada 1 min)

O script roda em **background**: o agente AVISA o usuário antes de iniciar e,
enquanto roda, posta no chat a cada ~1 minuto a **tabela de andamento** (qual
tarefa está rodando, qual não está, o que concluiu/falhou) junto com o
**resumo geral de andamento** (escrito por IA; sem IA, o motor resume). Ao
final, o usuário recebe o resumo completo da execução. A qualquer momento:

```bash
onp-spec resumo fundacao --tabela   # a tabela de andamento
onp-spec resumo fundacao            # o resumo em texto
```

