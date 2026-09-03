#!/usr/bin/env bash
# executar-tarefas.sh — gerado por `onp-spec plano fundacao` em 2026-09-03 00:16
# NÃO edite à mão: mudou tasks.md ou a config, regenere o plano.
#
# uso:
#   bash executar-tarefas.sh                  tudo (ondas → sequenciais → gate)
#   bash executar-tarefas.sh --faixa <id>     reexecuta UMA faixa (+ merge + gate)
#   bash executar-tarefas.sh --seq <T-xxx>    reexecuta UMA tarefa sequencial
#   bash executar-tarefas.sh --gate           só o gate (verify + audit)
#   bash executar-tarefas.sh --listar         mostra faixas, tarefas e estados
#   (acrescente --sem-gate para não rodar o gate ao final)
#
# resumo do que está rolando, a qualquer momento: onp-spec resumo fundacao
set -u
set -o pipefail

RUN_ID='api-externa-frontend-v1-fundacao-mtkryf4p'
FEATURE='fundacao'
BASE_BRANCH='spec/fundacao'
ENGINE='.agents/skills/onp-spec-driven/scripts/onp-spec.mjs'
CODEX_FLAGS=(--sandbox 'workspace-write')
STREAM_FLAGS=(--json)
FALHAS=""
COM_GATE=1
RESUMO_MODEL='gpt-5.6-luna'
RESUMO_PID=""

verde()    { printf '\033[32m%s\033[0m\n' "$*"; }
vermelho() { printf '\033[31m%s\033[0m\n' "$*"; }
amarelo()  { printf '\033[33m%s\033[0m\n' "$*"; }
info()     { printf '· %s\n' "$*"; }
falhar()   { vermelho "✘ $*"; exit 1; }

# eventos vão para o ledger GLOBAL (~/.onp-spec/painel/ledger.jsonl):
# um arquivo para todos os projetos, é o que o onp-spec resumo lê
evento() { node "$ENGINE" evento --run "$RUN_ID" "$@" >/dev/null 2>&1 || true; }

# ── ambiente (todos os modos passam por aqui) ────────────────────────
preparar_ambiente() {
  command -v git >/dev/null 2>&1 || falhar "git não encontrado"
  command -v node >/dev/null 2>&1 || falhar "node não encontrado"
  command -v codex >/dev/null 2>&1 || falhar "Codex CLI (codex) não encontrado — instale-o ou siga o modo manual em plano-execucao.md"
  TOPLEVEL=$(git rev-parse --show-toplevel 2>/dev/null) || falhar "fora de um repositório git"
  cd "$TOPLEVEL" || exit 1
  # artefatos recém-gerados pelo `onp-spec plano` são sujeira esperada:
  # se forem a ÚNICA sujeira, o script mesmo commita; qualquer outra, aborta
  if [ -n "$(git status --porcelain)" ]; then
    if [ -z "$(git status --porcelain | grep -v -e 'plano-execucao\.' -e 'plano\.json' -e 'executar-tarefas\.sh')" ]; then
      git add -A
      git commit -q -m "plano de execução: $FEATURE (artefatos gerados)"
      info "artefatos do plano commitados"
    else
      falhar "árvore suja além dos artefatos do plano — commite ou faça git stash antes (os worktrees partem do último commit)"
    fi
  fi
  git ls-files --error-unmatch -- '.spec/features/fundacao/spec.md' >/dev/null 2>&1 || falhar "spec.md não está commitada — os worktrees das faixas precisam dela no git"
  ATUAL=$(git rev-parse --abbrev-ref HEAD)
  [ "$ATUAL" != "HEAD" ] || falhar "HEAD destacado — troque para uma branch"
  if [ "$ATUAL" != "$BASE_BRANCH" ]; then
    if git show-ref --verify --quiet "refs/heads/$BASE_BRANCH"; then
      git checkout -q "$BASE_BRANCH" || falhar "não consegui trocar para $BASE_BRANCH"
    else
      git checkout -q -b "$BASE_BRANCH" || falhar "não consegui criar $BASE_BRANCH"
    fi
    info "branch de trabalho: $BASE_BRANCH (a partir de $ATUAL)"
  fi
  git worktree prune
  LOG_DIR="$(dirname "$TOPLEVEL")/onp-worktrees/api-externa-frontend-v1-fundacao-logs"
  WT_BASE="$(dirname "$TOPLEVEL")/onp-worktrees/api-externa-frontend-v1-fundacao"
  STREAMS_DIR="${ONP_SPEC_HOME:-$HOME/.onp-spec}/painel/streams/$RUN_ID"
  mkdir -p "$LOG_DIR" "$STREAMS_DIR"
}

# worktree limpo mesmo depois de uma tentativa que falhou
preparar_worktree() { # $1=faixa $2=branch $3=worktree
  git worktree prune
  if [ -e "$3" ]; then git worktree remove --force "$3" >/dev/null 2>&1; rm -rf "$3"; fi
  if git show-ref --verify --quiet "refs/heads/$2"; then git branch -D "$2" >/dev/null 2>&1; fi
  git worktree add "$3" -b "$2" >/dev/null 2>&1 || { vermelho "✘ não consegui criar o worktree de $1 em $3"; return 1; }
}

tentativa() { # $1=faixa — conta reexecuções (vai para o ledger)
  local arq="$LOG_DIR/.tentativa-$1"
  local n=1
  [ -f "$arq" ] && n=$(( $(cat "$arq") + 1 ))
  printf "%s" "$n" > "$arq"
  printf "%s" "$n"
}

# uma tarefa = uma sessão codex exec headless com contexto limpo.
# o JSONL da sessão vira o stream da tarefa no ledger
rodar_tarefa() { # $1=escopo(faixa|seq) $2=T-xxx $3=prompt $4=modelo $5=esforço
  local chave="$1--$2"
  local stream="$STREAMS_DIR/$chave.jsonl"
  local head_antes
  head_antes=$(git rev-parse HEAD)
  evento --tipo tarefa --tarefa "$2" --faixa "$1" --estado executando --stream "$chave"
  info "$2 — codex exec ($4 · $5) · stream: $chave"
  # --add-dir: o .git compartilhado dos worktrees mora no repo principal —
  # sem ele o sandbox workspace-write bloquearia o commit da tarefa
  if codex exec "$3" --model "$4" -c model_reasoning_effort="$5" "${STREAM_FLAGS[@]}" "${CODEX_FLAGS[@]}" --add-dir "$TOPLEVEL" > "$stream" 2>>"$LOG_DIR/$1.log"; then
    if [ "$(git rev-parse HEAD)" = "$head_antes" ] && [ -z "$(git status --porcelain)" ]; then
      printf "executor: %s terminou sem alterar nem commitar arquivos; tratando como falha
" "$2" >> "$LOG_DIR/$1.log"
      evento --tipo tarefa --tarefa "$2" --faixa "$1" --estado falhou --stream "$chave"
      node "$ENGINE" stream-resumo "$RUN_ID" "$chave" 2>/dev/null || true
      return 1
    fi
    evento --tipo tarefa --tarefa "$2" --faixa "$1" --estado concluida --stream "$chave"
    node "$ENGINE" stream-resumo "$RUN_ID" "$chave" 2>/dev/null || true
    return 0
  fi
  evento --tipo tarefa --tarefa "$2" --faixa "$1" --estado falhou --stream "$chave"
  node "$ENGINE" stream-resumo "$RUN_ID" "$chave" 2>/dev/null || true
  return 1
}

mesclar_faixa() { # $1=faixa $2=branch $3=worktree $4=exit-da-faixa
  if [ "$4" -ne 0 ]; then
    evento --tipo faixa --faixa "$1" --estado falhou
    vermelho "✘ $1 falhou (log: $LOG_DIR/$1.log) — worktree mantido para inspeção: $3"
    amarelo "  reexecute só ela: bash .spec/features/fundacao/executar-tarefas.sh --faixa $1"
    FALHAS="$FALHAS $1"; return 1
  fi
  if [ -n "$(git -C "$3" status --porcelain)" ]; then
    evento --tipo faixa --faixa "$1" --estado falhou
    vermelho "✘ $1 terminou com alterações sem commit no worktree: $3"
    FALHAS="$FALHAS $1"; return 1
  fi
  if [ "$(git rev-list --count "$BASE_BRANCH..$2")" -eq 0 ]; then
    evento --tipo faixa --faixa "$1" --estado falhou
    vermelho "✘ $1 terminou sem commit exclusivo; nenhuma implementação será marcada como concluída"
    FALHAS="$FALHAS $1"; return 1
  fi
  evento --tipo faixa --faixa "$1" --estado mesclando
  if git merge --no-ff "$2" -m "merge $1 ($FEATURE)"; then
    git worktree remove --force "$3" >/dev/null 2>&1
    git branch -d "$2" >/dev/null 2>&1
    evento --tipo faixa --faixa "$1" --estado mesclada
    verde "✔ $1 mesclada em $BASE_BRANCH"
  else
    git merge --abort >/dev/null 2>&1
    evento --tipo faixa --faixa "$1" --estado conflito
    vermelho "✘ conflito ao mesclar $1 — resolva na mão: git merge $2 (worktree mantido: $3)"
    FALHAS="$FALHAS $1"; return 1
  fi
}

marcar_concluidas() { # $@=T-xxx
  for t in "$@"; do node "$ENGINE" tarefa "$FEATURE" "$t" concluida >/dev/null || true; done
}

# ── resumo geral de andamento: 1/min enquanto a execução roda ─────────
# escrito por IA (codex exec somente leitura) com fallback do motor; vai
# para o terminal e para o ledger — o agente repassa o texto no chat.
gerar_resumo() {
  local ctx ia
  ctx=$(node "$ENGINE" resumo "$FEATURE" --contexto 2>/dev/null) || ctx=""
  [ -n "$ctx" ] || return 0
  ia=$(codex exec "Você narra, para o dono do produto, uma execução de tarefas de código em andamento. Estado mecânico:

$ctx

Escreva o RESUMO GERAL DE ANDAMENTO: um parágrafo único de 2 a 4 frases, em português simples, dizendo o que está acontecendo agora, o que já terminou, o que falhou e se o usuário precisa agir. Sem markdown, sem listas." --model "$RESUMO_MODEL" --sandbox read-only --ephemeral 2>/dev/null)
  if [ -n "$ia" ]; then
    node "$ENGINE" resumo "$FEATURE" --gravar --origem ia --texto "$ia" >/dev/null 2>&1 || true
    printf '\n📣 resumo (IA): %s\n' "$ia"
  else
    node "$ENGINE" resumo "$FEATURE" --gravar >/dev/null 2>&1 || true
    printf '\n📣 resumo: %s\n' "$(node "$ENGINE" resumo "$FEATURE" 2>/dev/null)"
  fi
}

# mata o loop E o sleep filho — senão o sleep herda o stdout e quem chamou
# o script via pipe fica esperando EOF por até 60s depois do exit
parar_resumos() {
  [ -n "$RESUMO_PID" ] || return 0
  command -v pkill >/dev/null 2>&1 && pkill -P "$RESUMO_PID" 2>/dev/null
  kill "$RESUMO_PID" 2>/dev/null
  RESUMO_PID=""
}

iniciar_resumos() {
  ( while :; do sleep 60; gerar_resumo; done ) &
  RESUMO_PID=$!
  # ao sair: para o loop e grava um último resumo (o estado final, do motor)
  trap 'parar_resumos; node "$ENGINE" resumo "$FEATURE" --gravar >/dev/null 2>&1 || true' EXIT
}

# ── faixa-1: T-001 ──
executar_faixa_1() {
  local WT="$WT_BASE-faixa-1"
  preparar_worktree 'faixa-1' 'spec/fundacao-faixa-1' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-1' --estado executando --tentativa "$(tentativa 'faixa-1')"
  : > "$LOG_DIR/faixa-1.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-1' 'T-001' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-001 — "Tokens, base e tipografia do design system"
  critérios/refs: AC-013 (Colunas numéricas alinham na vertical), AC-015 (Todo controle mostra o foco de teclado)
  arquivos permitidos (e seus testes): src/styles/_tokens.scss, src/styles/_base.scss, src/styles/_tipografia.scss, src/styles/index.scss, src/styles.scss
  mensagem de commit: "T-001 fundacao: Tokens, base e tipografia do design system"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' medium
  ) >> "$LOG_DIR/faixa-1.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-1' 'spec/fundacao-faixa-1' "$WT" "$st" || return 1
  marcar_concluidas T-001
  return 0
}

# ── faixa-2: T-003 ──
executar_faixa_2() {
  local WT="$WT_BASE-faixa-2"
  preparar_worktree 'faixa-2' 'spec/fundacao-faixa-2' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-2' --estado executando --tentativa "$(tentativa 'faixa-2')"
  : > "$LOG_DIR/faixa-2.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-2' 'T-003' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-003 — "Shell de navegação com sidebar e topbar"
  critérios/refs: AC-001 (A navegação lista as áreas e destaca a atual)
  arquivos permitidos (e seus testes): src/app/presentation/layout/shell/shell.ts, src/app/presentation/layout/shell/shell.spec.ts, src/app/app.ts, src/app/app.html, src/app/app.scss, src/app/app.spec.ts
  mensagem de commit: "T-003 fundacao: Shell de navegação com sidebar e topbar"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' medium
  ) >> "$LOG_DIR/faixa-2.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-2' 'spec/fundacao-faixa-2' "$WT" "$st" || return 1
  marcar_concluidas T-003
  return 0
}

# ── faixa-3: T-004 ──
executar_faixa_3() {
  local WT="$WT_BASE-faixa-3"
  preparar_worktree 'faixa-3' 'spec/fundacao-faixa-3' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-3' --estado executando --tentativa "$(tentativa 'faixa-3')"
  : > "$LOG_DIR/faixa-3.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-3' 'T-004' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-004 — "Rotas da aplicação, raiz e página não encontrada"
  critérios/refs: AC-002 (A rota raiz leva ao dashboard), AC-003 (Endereço inexistente informa sem derrubar a navegação)
  arquivos permitidos (e seus testes): src/app/app.routes.ts, src/app/app.routes.spec.ts, src/app/presentation/features/nao-encontrado/nao-encontrado.ts
  mensagem de commit: "T-004 fundacao: Rotas da aplicação, raiz e página não encontrada"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' low
  ) >> "$LOG_DIR/faixa-3.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-3' 'spec/fundacao-faixa-3' "$WT" "$st" || return 1
  marcar_concluidas T-004
  return 0
}

# ── faixa-4: T-005 ──
executar_faixa_4() {
  local WT="$WT_BASE-faixa-4"
  preparar_worktree 'faixa-4' 'spec/fundacao-faixa-4' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-4' --estado executando --tentativa "$(tentativa 'faixa-4')"
  : > "$LOG_DIR/faixa-4.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-4' 'T-005' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-005 — "Store do investidor de contexto com persistência e revalidação"
  critérios/refs: AC-004 (O seletor lista os investidores e define o contexto), AC-005 (O contexto sobrevive ao recarregamento da página), AC-006 (Contexto de investidor excluído não persiste), AC-009 (Trocar de investidor troca os dados exibidos)
  arquivos permitidos (e seus testes): src/app/application/investidor-contexto.store.ts, src/app/application/investidor-contexto.store.spec.ts
  mensagem de commit: "T-005 fundacao: Store do investidor de contexto com persistência e revalidação"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' high
  ) >> "$LOG_DIR/faixa-4.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-4' 'spec/fundacao-faixa-4' "$WT" "$st" || return 1
  marcar_concluidas T-005
  return 0
}

# ── faixa-5: T-008 ──
executar_faixa_5() {
  local WT="$WT_BASE-faixa-5"
  preparar_worktree 'faixa-5' 'spec/fundacao-faixa-5' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-5' --estado executando --tentativa "$(tentativa 'faixa-5')"
  : > "$LOG_DIR/faixa-5.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-5' 'T-008' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-008 — "Configuração de HTTP, base da API e paginação"
  critérios/refs: AC-010 (Erro de validação vira mensagem no campo), AC-011 (Erro sem mensagem tem texto compreensível), AC-012 (Falha de serviço externo oferece tentar de novo)
  arquivos permitidos (e seus testes): src/app/app.config.ts, src/app/core/config/api.config.ts, src/app/core/http/api-url-interceptor.ts, src/app/core/http/http-params.ts, src/app/domain/models/page.model.ts
  mensagem de commit: "T-008 fundacao: Configuração de HTTP, base da API e paginação"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' low
  ) >> "$LOG_DIR/faixa-5.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-5' 'spec/fundacao-faixa-5' "$WT" "$st" || return 1
  marcar_concluidas T-008
  return 0
}

# ── sequencial T-002 (fora da seleção do usuário) ──
executar_seq_T_002() {
  info 'sequencial T-002 — Classes de controle, tabela e card'
  if rodar_tarefa seq 'T-002' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-002 — "Classes de controle, tabela e card"
  critérios/refs: AC-013 (Colunas numéricas alinham na vertical), AC-014 (Variação nunca é comunicada só por cor), AC-015 (Todo controle mostra o foco de teclado)
  arquivos permitidos (e seus testes): src/styles/_controles.scss, src/styles/_tabela.scss, src/styles/_card.scss
  mensagem de commit: "T-002 fundacao: Classes de controle, tabela e card"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' medium >> "$LOG_DIR/seq.log" 2>&1; then
    # commit de segurança se o agente esqueceu (rastreabilidade > perfeição)
    if [ -n "$(git status --porcelain)" ]; then
      git add -A && git commit -q -m 'T-002 fundacao: Classes de controle, tabela e card (auto-commit do plano)'
    fi
    marcar_concluidas T-002
    verde "✔ T-002 concluída"
    return 0
  fi
  vermelho "✘ T-002 falhou (log: $LOG_DIR/seq.log)"
  amarelo "  reexecute só ela: bash .spec/features/fundacao/executar-tarefas.sh --seq T-002"
  FALHAS="$FALHAS T-002"
  return 1
}

# ── sequencial T-006 (fora da seleção do usuário) ──
executar_seq_T_006() {
  info 'sequencial T-006 — Seletor de investidor na topbar'
  if rodar_tarefa seq 'T-006' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-006 — "Seletor de investidor na topbar"
  critérios/refs: AC-004 (O seletor lista os investidores e define o contexto), AC-009 (Trocar de investidor troca os dados exibidos)
  arquivos permitidos (e seus testes): src/app/shared/components/seletor-investidor/seletor-investidor.ts, src/app/shared/components/seletor-investidor/seletor-investidor.spec.ts
  mensagem de commit: "T-006 fundacao: Seletor de investidor na topbar"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' medium >> "$LOG_DIR/seq.log" 2>&1; then
    # commit de segurança se o agente esqueceu (rastreabilidade > perfeição)
    if [ -n "$(git status --porcelain)" ]; then
      git add -A && git commit -q -m 'T-006 fundacao: Seletor de investidor na topbar (auto-commit do plano)'
    fi
    marcar_concluidas T-006
    verde "✔ T-006 concluída"
    return 0
  fi
  vermelho "✘ T-006 falhou (log: $LOG_DIR/seq.log)"
  amarelo "  reexecute só ela: bash .spec/features/fundacao/executar-tarefas.sh --seq T-006"
  FALHAS="$FALHAS T-006"
  return 1
}

# ── sequencial T-007 (fora da seleção do usuário) ──
executar_seq_T_007() {
  info 'sequencial T-007 — Guard de contexto nas áreas que dependem de investidor'
  if rodar_tarefa seq 'T-007' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-007 — "Guard de contexto nas áreas que dependem de investidor"
  critérios/refs: AC-007 (Áreas que dependem de investidor exigem contexto), AC-008 (Catálogos continuam acessíveis sem contexto)
  arquivos permitidos (e seus testes): src/app/core/guards/investidor-contexto.guard.ts, src/app/core/guards/investidor-contexto.guard.spec.ts
  mensagem de commit: "T-007 fundacao: Guard de contexto nas áreas que dependem de investidor"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' medium >> "$LOG_DIR/seq.log" 2>&1; then
    # commit de segurança se o agente esqueceu (rastreabilidade > perfeição)
    if [ -n "$(git status --porcelain)" ]; then
      git add -A && git commit -q -m 'T-007 fundacao: Guard de contexto nas áreas que dependem de investidor (auto-commit do plano)'
    fi
    marcar_concluidas T-007
    verde "✔ T-007 concluída"
    return 0
  fi
  vermelho "✘ T-007 falhou (log: $LOG_DIR/seq.log)"
  amarelo "  reexecute só ela: bash .spec/features/fundacao/executar-tarefas.sh --seq T-007"
  FALHAS="$FALHAS T-007"
  return 1
}

# ── sequencial T-009 (fora da seleção do usuário) ──
executar_seq_T_009() {
  info 'sequencial T-009 — Tradução de erro da API para a tela'
  if rodar_tarefa seq 'T-009' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-009 — "Tradução de erro da API para a tela"
  critérios/refs: AC-010 (Erro de validação vira mensagem no campo), AC-011 (Erro sem mensagem tem texto compreensível), AC-012 (Falha de serviço externo oferece tentar de novo)
  arquivos permitidos (e seus testes): src/app/core/http/http-error-interceptor.ts, src/app/core/http/http-error-interceptor.spec.ts, src/app/domain/models/api-error.model.ts
  mensagem de commit: "T-009 fundacao: Tradução de erro da API para a tela"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' high >> "$LOG_DIR/seq.log" 2>&1; then
    # commit de segurança se o agente esqueceu (rastreabilidade > perfeição)
    if [ -n "$(git status --porcelain)" ]; then
      git add -A && git commit -q -m 'T-009 fundacao: Tradução de erro da API para a tela (auto-commit do plano)'
    fi
    marcar_concluidas T-009
    verde "✔ T-009 concluída"
    return 0
  fi
  vermelho "✘ T-009 falhou (log: $LOG_DIR/seq.log)"
  amarelo "  reexecute só ela: bash .spec/features/fundacao/executar-tarefas.sh --seq T-009"
  FALHAS="$FALHAS T-009"
  return 1
}

# ── sequencial T-010 (fora da seleção do usuário) ──
executar_seq_T_010() {
  info 'sequencial T-010 — Componentes compartilhados de estado e navegação'
  if rodar_tarefa seq 'T-010' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-010 — "Componentes compartilhados de estado e navegação"
  critérios/refs: AC-012 (Falha de serviço externo oferece tentar de novo), AC-013 (Colunas numéricas alinham na vertical)
  arquivos permitidos (e seus testes): src/app/shared/components/skeleton-tabela/skeleton-tabela.ts, src/app/shared/components/estado-vazio/estado-vazio.ts, src/app/shared/components/card-erro/card-erro.ts, src/app/shared/components/paginador/paginador.ts, src/app/shared/components/modal-confirmacao/modal-confirmacao.ts, src/app/shared/components/componentes-estado.spec.ts
  mensagem de commit: "T-010 fundacao: Componentes compartilhados de estado e navegação"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' high >> "$LOG_DIR/seq.log" 2>&1; then
    # commit de segurança se o agente esqueceu (rastreabilidade > perfeição)
    if [ -n "$(git status --porcelain)" ]; then
      git add -A && git commit -q -m 'T-010 fundacao: Componentes compartilhados de estado e navegação (auto-commit do plano)'
    fi
    marcar_concluidas T-010
    verde "✔ T-010 concluída"
    return 0
  fi
  vermelho "✘ T-010 falhou (log: $LOG_DIR/seq.log)"
  amarelo "  reexecute só ela: bash .spec/features/fundacao/executar-tarefas.sh --seq T-010"
  FALHAS="$FALHAS T-010"
  return 1
}

# ── sequencial T-011 (fora da seleção do usuário) ──
executar_seq_T_011() {
  info 'sequencial T-011 — Frescor de cotação e badge de defasagem'
  if rodar_tarefa seq 'T-011' 'Você executa UMA tarefa da feature "fundacao" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/fundacao/spec.md, .spec/features/fundacao/tasks.md e .spec/constituicao.md.
A especificação, o desenho e este plano de execução já foram aprovados pelo usuário. A etapa de brainstorming está concluída: NÃO peça nova confirmação e implemente agora.

Sua tarefa (somente ela):
T-011 — "Frescor de cotação e badge de defasagem"
  critérios/refs: AC-044 (Cotação além do limiar do mercado é sinalizada), AC-045 (Defasagem geral vira um aviso só, não um por linha), AC-073 (Cotação defasada é sinalizada na linha), AC-104 (Nenhum número aparece sem o horário da cotação que o gerou), AC-105 (Consolidado com cotação defasada é sinalizado)
  arquivos permitidos (e seus testes): src/app/application/cotacao-frescor.ts, src/app/shared/components/badge-defasagem/badge-defasagem.ts
  mensagem de commit: "T-011 fundacao: Frescor de cotação e badge de defasagem"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `npx ng test --reporters=tap --watch=false` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'gpt-5.6-terra' medium >> "$LOG_DIR/seq.log" 2>&1; then
    # commit de segurança se o agente esqueceu (rastreabilidade > perfeição)
    if [ -n "$(git status --porcelain)" ]; then
      git add -A && git commit -q -m 'T-011 fundacao: Frescor de cotação e badge de defasagem (auto-commit do plano)'
    fi
    marcar_concluidas T-011
    verde "✔ T-011 concluída"
    return 0
  fi
  vermelho "✘ T-011 falhou (log: $LOG_DIR/seq.log)"
  amarelo "  reexecute só ela: bash .spec/features/fundacao/executar-tarefas.sh --seq T-011"
  FALHAS="$FALHAS T-011"
  return 1
}

# ── gate: quem decide é a máquina ────────────────────────────────────
rodar_gate() {
  echo
  info "gate: verify + audit --ci"
  evento --tipo gate --etapa inicio
  node "$ENGINE" verify "$FEATURE"
  local v=$?
  evento --tipo gate --etapa verify --exit "$v"
  node "$ENGINE" audit --ci
  AUDIT=$?
  evento --tipo gate --etapa audit --exit "$AUDIT"
  # fecha a contabilidade: status das tarefas + prova do verify no git
  if [ -n "$(git status --porcelain -- '.spec')" ]; then
    git add -A -- '.spec'
    git commit -q -m "$FEATURE: status das tarefas + prova do verify (plano)"
    info "status das tarefas e prova do verify commitados"
  fi
  return "$AUDIT"
}

encerrar() { # $1=escopo
  echo
  if [ -n "$FALHAS" ]; then vermelho "faixas/tarefas com falha:$FALHAS"; fi
  # sem gate não existe veredito: NUNCA anunciar alinhamento sem o audit
  if [ "$COM_GATE" -eq 0 ]; then
    evento --tipo fim --exit 1 --escopo "$1"
    if [ -z "$FALHAS" ]; then
      amarelo "○ trabalho de '$1' terminou SEM o gate (--sem-gate) — isto NÃO é prova de nada"
      amarelo "  para o veredito: bash .spec/features/fundacao/executar-tarefas.sh --gate"
      exit 0
    fi
    vermelho "e ainda há falhas — conserte e rode o gate"
    exit 1
  fi
  rodar_gate
  local audit=$?
  if [ "$audit" -eq 0 ] && [ -z "$FALHAS" ]; then
    evento --tipo fim --exit 0 --escopo "$1"
    verde "✔ plano concluído — especificação e código alinhados (audit exit 0) na branch $BASE_BRANCH"
    info "próximo passo: revise e leve para a main quando quiser (git merge $BASE_BRANCH)"
    exit 0
  fi
  evento --tipo fim --exit 1 --escopo "$1"
  vermelho "plano terminou com pendências — leia a saída do audit acima e os logs em $LOG_DIR"
  amarelo "dica: reexecute só o que falhou (--faixa <id> / --seq <T-xxx>)"
  exit 1
}

executar_tudo() {
  evento --tipo inicio --escopo tudo
  iniciar_resumos
  info "logs em: $LOG_DIR"
  info "resumo geral de andamento: a cada 1 min aqui no terminal (e via: onp-spec resumo)"
  # onda 1: faixa-1 ∥ faixa-2 ∥ faixa-3
  info "onda 1: faixa-1 ∥ faixa-2 ∥ faixa-3 — janelas limpas em paralelo"
  executar_faixa_1 & PID_FAIXA_1=$!
  executar_faixa_2 & PID_FAIXA_2=$!
  executar_faixa_3 & PID_FAIXA_3=$!
  wait "$PID_FAIXA_1" || true
  wait "$PID_FAIXA_2" || true
  wait "$PID_FAIXA_3" || true
  # onda 2: faixa-4 ∥ faixa-5
  info "onda 2: faixa-4 ∥ faixa-5 — janelas limpas em paralelo"
  executar_faixa_4 & PID_FAIXA_4=$!
  executar_faixa_5 & PID_FAIXA_5=$!
  wait "$PID_FAIXA_4" || true
  wait "$PID_FAIXA_5" || true
  executar_seq_T_002 || true
  executar_seq_T_006 || true
  executar_seq_T_007 || true
  executar_seq_T_009 || true
  executar_seq_T_010 || true
  executar_seq_T_011 || true
  encerrar tudo
}

listar() {
  echo "execução: $RUN_ID (feature $FEATURE, branch $BASE_BRANCH)"
  echo "  faixa-1  onda 1  T-001"
  echo "  faixa-2  onda 1  T-003"
  echo "  faixa-3  onda 1  T-004"
  echo "  faixa-4  onda 2  T-005"
  echo "  faixa-5  onda 2  T-008"
  echo "  seq       T-002 (sequencial)"
  echo "  seq       T-006 (sequencial)"
  echo "  seq       T-007 (sequencial)"
  echo "  seq       T-009 (sequencial)"
  echo "  seq       T-010 (sequencial)"
  echo "  seq       T-011 (sequencial)"
  echo
  echo "reexecutar uma faixa:    --faixa <id>"
  echo "reexecutar sequencial:   --seq <T-xxx>"
  echo "só o gate:               --gate"
}

MODO="tudo"
ALVO=""
while [ $# -gt 0 ]; do
  case "$1" in
    --listar) MODO="listar" ;;
    --gate) MODO="gate" ;;
    --sem-gate) COM_GATE=0 ;;
    --faixa) MODO="faixa"; ALVO="${2:-}"; shift ;;
    --seq) MODO="seq"; ALVO="${2:-}"; shift ;;
    -h|--help) sed -n "2,14p" "$0"; exit 0 ;;
    *) vermelho "argumento desconhecido: $1"; sed -n "2,14p" "$0"; exit 2 ;;
  esac
  shift
done

if [ "$MODO" = "listar" ]; then listar; exit 0; fi

preparar_ambiente

case "$MODO" in
  tudo) executar_tudo ;;
  gate) COM_GATE=1; iniciar_resumos; encerrar gate ;;
  faixa)
    case "$ALVO" in
      faixa-1) evento --tipo inicio --escopo "faixa:faixa-1"; iniciar_resumos; executar_faixa_1 || true; encerrar "faixa:faixa-1" ;;
      faixa-2) evento --tipo inicio --escopo "faixa:faixa-2"; iniciar_resumos; executar_faixa_2 || true; encerrar "faixa:faixa-2" ;;
      faixa-3) evento --tipo inicio --escopo "faixa:faixa-3"; iniciar_resumos; executar_faixa_3 || true; encerrar "faixa:faixa-3" ;;
      faixa-4) evento --tipo inicio --escopo "faixa:faixa-4"; iniciar_resumos; executar_faixa_4 || true; encerrar "faixa:faixa-4" ;;
      faixa-5) evento --tipo inicio --escopo "faixa:faixa-5"; iniciar_resumos; executar_faixa_5 || true; encerrar "faixa:faixa-5" ;;
      *) falhar "faixa desconhecida: '$ALVO' — veja as disponíveis com --listar" ;;
    esac ;;
  seq)
    case "$ALVO" in
      T-002) evento --tipo inicio --escopo "seq:T-002"; iniciar_resumos; executar_seq_T_002 || true; encerrar "seq:T-002" ;;
      T-006) evento --tipo inicio --escopo "seq:T-006"; iniciar_resumos; executar_seq_T_006 || true; encerrar "seq:T-006" ;;
      T-007) evento --tipo inicio --escopo "seq:T-007"; iniciar_resumos; executar_seq_T_007 || true; encerrar "seq:T-007" ;;
      T-009) evento --tipo inicio --escopo "seq:T-009"; iniciar_resumos; executar_seq_T_009 || true; encerrar "seq:T-009" ;;
      T-010) evento --tipo inicio --escopo "seq:T-010"; iniciar_resumos; executar_seq_T_010 || true; encerrar "seq:T-010" ;;
      T-011) evento --tipo inicio --escopo "seq:T-011"; iniciar_resumos; executar_seq_T_011 || true; encerrar "seq:T-011" ;;
      *) falhar "tarefa sequencial desconhecida: '$ALVO' — veja as disponíveis com --listar" ;;
    esac ;;
esac
