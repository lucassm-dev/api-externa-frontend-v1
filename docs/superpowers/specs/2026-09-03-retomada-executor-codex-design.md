# Retomada do executor Codex

## Contexto

O executor de `fundacao` foi interrompido porque o Codex CLI recebeu
`--approve-for-me` junto de um `sandbox_mode` herdado da configuracao pessoal.
A versao atual do CLI considera essas opcoes mutuamente exclusivas.

## Decisao

As sessoes headless geradas pelo ONP devem receber
`--ignore-user-config --approve-for-me`. A autenticacao continua vindo de
`CODEX_HOME`; modelo, esforco, stream JSON e diretorios gravaveis continuam
declarados pelo plano; as regras do repositorio continuam carregadas.
`--approve-for-me` aplica o sandbox `workspace-write` usado pela execucao.

## Alternativas rejeitadas

- Usar somente `--sandbox workspace-write`: pode bloquear uma sessao headless
  quando uma acao precisar de aprovacao.
- Detectar versao e configuracao em tempo de execucao: adiciona caminhos e
  estados desnecessarios para um conflito que pode ser eliminado na origem.

## Verificacao

1. Regenerar o plano de `fundacao` pelo motor.
2. Confirmar que o script gerado contem as duas flags, sem `--sandbox` na
   chamada das tarefas.
3. Validar a sintaxe do script com `bash -n`.
4. Reexecutar apenas as faixas interrompidas e confirmar que o erro de flags
   mutuamente exclusivas nao reaparece.
