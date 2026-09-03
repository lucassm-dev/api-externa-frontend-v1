# Plano de execução — investidores

> gerado por `onp-spec plano` em 2026-09-03 04:29 — NÃO edite à mão;
> mudou tasks.md ou a config? Regenere: `onp-spec plano investidores`

## Resumo — o que vai acontecer

- **5 tarefa(s) pendente(s)**: 5 em 5 faixa(s) paralela(s) + 0 sequencial(is)
- **1 faixa = 1 worktree + 1 branch + 1 janela de contexto limpa** — faixas não compartilham nenhum arquivo entre si
- prefere outra seleção ou uma após a outra? Regenere com `onp-spec plano investidores --paralelizar T-xxx,T-yyy` ou `--sequencial`
- tudo acontece na branch de trabalho `spec/investidores`; levar para a main é decisão sua

## Faixas e ondas

### Onda 1 — faixa-1 ∥ faixa-2 ∥ faixa-3

#### faixa-1 — branch `spec/investidores-faixa-1` — worktree `../onp-worktrees/api-externa-frontend-v1-investidores-faixa-1`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-012 | Contrato e repositório HTTP de investidores | `gpt-5.6-terra` | low | `src/app/domain/models/investidor.model.ts`, `src/app/domain/ports/investidor-repository.port.ts`, `src/app/infra/http/investidor-http.repository.ts` |

#### faixa-2 — branch `spec/investidores-faixa-2` — worktree `../onp-worktrees/api-externa-frontend-v1-investidores-faixa-2`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-013 | Facade de investidores | `gpt-5.6-terra` | medium | `src/app/application/investidores.facade.ts` |

#### faixa-3 — branch `spec/investidores-faixa-3` — worktree `../onp-worktrees/api-externa-frontend-v1-investidores-faixa-3`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-014 | Listagem de investidores com paginação, vazio e escolha de contexto | `gpt-5.6-terra` | medium | `src/app/presentation/features/investidores/investidores-page.ts` |

### Onda 2 — faixa-4 ∥ faixa-5

#### faixa-4 — branch `spec/investidores-faixa-4` — worktree `../onp-worktrees/api-externa-frontend-v1-investidores-faixa-4`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-015 | Formulário de cadastro de investidor | `gpt-5.6-terra` | high | `src/app/presentation/features/investidores/investidor-form.ts` |

#### faixa-5 — branch `spec/investidores-faixa-5` — worktree `../onp-worktrees/api-externa-frontend-v1-investidores-faixa-5`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-016 | Exclusão de investidor com confirmação | `gpt-5.6-terra` | low | `src/app/presentation/features/investidores/investidor-excluir.ts` |

## Gestão de branches e commits

1. branch de trabalho `spec/investidores` criada do ponto atual (se ainda não existir)
2. cada faixa nasce dela como branch própria e roda no seu worktree — **1 tarefa = 1 commit** (`T-xxx feature: título`)
3. terminou a onda → merge `--no-ff` de cada faixa de volta, na ordem; conflito interrompe a faixa e pede resolução humana
4. faixa mesclada → worktree removido, branch apagada, tarefa marcada `[concluida]` no tasks.md
5. gate final na branch de trabalho: `onp-spec verify investidores` + `onp-spec audit --ci` — **exit 0 ou não está pronto**

## Como executar

### ▶ Execução — Codex headless (codex exec)

```bash
bash .spec/features/investidores/executar-tarefas.sh
```

Cada faixa roda `codex exec` com **janela de contexto limpa**, no seu worktree, com
`--model` e `model_reasoning_effort` já definidos por tarefa e sandbox `workspace-write`. Os prompts exatos estão
embutidos no script — quer rodar uma faixa na mão, é só copiá-los de lá.
Logs: `../onp-worktrees/api-externa-frontend-v1-investidores-logs/`.

**Confirmação de custos — antes de executar**: os modelos e esforços por
tarefa estão nas tabelas acima; o agente CONFIRMA com o usuário se estão
dentro da licença/cota dele (modelo forte + esforço alto torra tokens).
Para gastar menos: `onp-spec plano investidores --modelo gpt-5.6-luna --esforco baixo`
(tudo) ou por tarefa `onp-spec tarefa investidores T-xxx --modelo <m> --esforco <nível>` — e regenere o plano.

### 📣 Acompanhamento — tabela + resumo no chat (a cada 1 min)

O script roda em **background**: o agente AVISA o usuário antes de iniciar e,
enquanto roda, posta no chat a cada ~1 minuto a **tabela de andamento** (qual
tarefa está rodando, qual não está, o que concluiu/falhou) junto com o
**resumo geral de andamento** (escrito por IA; sem IA, o motor resume). Ao
final, o usuário recebe o resumo completo da execução. A qualquer momento:

```bash
onp-spec resumo investidores --tabela   # a tabela de andamento
onp-spec resumo investidores            # o resumo em texto
```

