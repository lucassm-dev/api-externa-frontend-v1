# Constituição — v1.1.0

<!--
  Princípios inegociáveis do projeto. Não são estilo: são restrições.
  P-xxx = princípio (código de rastreio, como US/AC/T).
  Níveis: [DEVE] obrigatório · [RECOMENDADO] forte · [PODE] permitido/explícito.
  Todo [DEVE] precisa de verificação executável — senão o audit acusa
  "princípio sem verificação" (PRINCIPIO_SEM_VERIFICACAO). Formatos:
    - verificação(gate): satisfeita pelo próprio audit (só p/ princípios "meta")
    - verificação(teste): @principle:P-xxx
    - verificação(proibido): `regex` em `glob`
    - verificação(obrigatório): `regex` em `glob`
-->

## P-001 [DEVE] Todo requisito tem prova executável

Nenhuma feature é declarada pronta sem o audit em modo CI sair limpo (exit 0).
Este princípio é verificado pelo próprio mecanismo do audit (AC_SEM_TESTE,
AC_SEM_PROVA, TASK_CONCLUIDA_SEM_PROVA) — não precisa de teste extra seu.

- verificação(gate): intrínseca ao audit

## P-002 [RECOMENDADO] Segredos nunca em código

Chaves e senhas vêm de variáveis de ambiente, nunca hard-coded.

- verificação(proibido): `(api[_-]?key|senha|password)\s*[:=]\s*['"][^'"]{8,}` em `src/**/*.ts`

## P-003 [DEVE] O sistema visual é flat — sem sombra fora das duas exceções

O design system FEF Invest (`docs/design-system-fef-invest.md`, seção 10) não tem sombra.
Existem exatamente duas exceções, ambas funcionais e ambas implementadas em
`src/styles/`: o anel de foco (`box-shadow: 0 0 0 3px rgba(15,158,122,.15)`) e o gradiente
de overflow da tabela. Qualquer `box-shadow` ou `text-shadow` escrito num componente é
violação — se um elemento precisa se destacar, use `--border-strong`.

- verificação(proibido): `(box-shadow|text-shadow)\s*:` em `src/app/**/*.scss`

## P-004 [DEVE] Nenhuma cotação é exibida sem o horário em que foi obtida

Regra de negócio RN-Q01: os preços vêm de fontes gratuitas com atraso de minutos a meia
hora, então um número sozinho na tela mente sobre o quão atual ele é. Todo componente que
mostra `cotacaoAtual` mostra junto o `dataHoraCotacao` correspondente.

- verificação(teste): @principle:P-004

## P-005 [DEVE] Componente não fala HTTP

A dependência aponta para dentro: a tela injeta uma facade de `application/`, que depende
de uma interface em `domain/ports/`, implementada em `infra/http/`. Componente que injeta
`HttpClient` ou importa um repositório de `infra/` fura as camadas e torna a tela
impossível de testar sem rede.

- verificação(proibido): `(HttpClient|from '.*infra/http)` em `src/app/presentation/**/*.ts`
