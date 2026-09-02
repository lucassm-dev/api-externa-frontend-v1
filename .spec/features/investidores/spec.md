# Spec: Investidores

> feature: investidores
> status: rascunho

<!--
  Insumos: docs/api/backend-api.md (§ Investidores), design D-02 e D-05.
  Códigos de rastreio globais e contínuos — esta feature começa em US-005 / AC-016.
-->

## Contexto

O cadastro de investidores é a raiz da cadeia do domínio: sem investidor não há carteira, e
sem carteira não há operação. Como não existe login, esta tela também é a porta de entrada
do sistema — é para cá que o guard manda quem chega sem investidor de contexto.

## Histórias

### US-005 — Cadastrar investidor

Como visitante, quero cadastrar um investidor informando nome, e-mail e CPF, para poder
montar carteiras e registrar operações.

#### AC-016 — Dados válidos criam o investidor

- **Dado** que informo nome, e-mail e CPF válidos e ainda não usados
- **Quando** envio o cadastro
- **Então** o investidor é criado e passa a aparecer na lista de investidores

#### AC-017 — Campos inválidos são apontados um a um

- **Dado** que deixo campos em branco ou informo e-mail malformado ou CPF fora de 11
  dígitos numéricos
- **Quando** envio o cadastro
- **Então** cada campo problemático mostra a mensagem correspondente e nenhum investidor é
  criado

#### AC-018 — E-mail já cadastrado é recusado no campo de e-mail

- **Dado** que já existe um investidor com aquele e-mail
- **Quando** envio o cadastro
- **Então** o investidor não é duplicado e a mensagem de e-mail já em uso aparece no campo
  de e-mail, não como erro geral da tela

#### AC-019 — CPF já cadastrado é recusado no campo de CPF

- **Dado** que já existe um investidor com aquele CPF
- **Quando** envio o cadastro
- **Então** o investidor não é duplicado e a mensagem de CPF já em uso aparece no campo de
  CPF

### US-006 — Encontrar e escolher um investidor

Como investidor, quero ver os investidores cadastrados e escolher com qual vou trabalhar,
para que as demais telas passem a mostrar os dados dele.

#### AC-020 — Lista paginada mostra os investidores ativos

- **Dado** que existem investidores cadastrados
- **Quando** abro a tela de investidores
- **Então** vejo uma lista paginada com nome e e-mail de cada um, navegável por páginas

#### AC-021 — Lista vazia orienta o cadastro

- **Dado** que não há nenhum investidor cadastrado
- **Quando** abro a tela
- **Então** vejo um estado vazio que me convida a cadastrar o primeiro investidor, com o
  botão de cadastro à mão

#### AC-022 — Escolher um investidor da lista define o contexto

- **Dado** um investidor na lista
- **Quando** escolho trabalhar com ele
- **Então** ele passa a ser o investidor de contexto e as áreas que dependem de investidor
  ficam acessíveis

### US-007 — Excluir investidor

Como investidor, quero excluir um investidor que não uso mais, para manter a lista limpa.

#### AC-023 — Excluir pede confirmação e some da lista

- **Dado** um investidor na lista
- **Quando** escolho excluir e confirmo
- **Então** ele deixa de aparecer na lista de investidores

## Fora de escopo

- **Editar investidor** — o backend não expõe endpoint de atualização.
- **Exibir ou consultar o CPF** — ele entra no cadastro mas nunca volta na resposta
  (`InvestidorResponseDTO` traz só id, nome e e-mail).
- **Limpar o contexto na hora ao excluir o próprio investidor de contexto** — por decisão
  registrada na Q-001 da fundação, a revalidação acontece só na abertura da aplicação.
  Durante a sessão, as chamadas seguintes falham com 404 e as telas já tratam isso.
- Senha, login e recuperação de conta — não há autenticação no backend.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-005 | A mensagem de conflito (409) nomeia qual campo colidiu — "E-mail já está em uso" ou "CPF já está em uso" — e isso basta para direcionar o erro ao campo certo | confirmada | Confirmado nas mensagens do `InvestidorService` |
| ASM-006 | Não validar o dígito verificador do CPF no cliente é aceitável: o backend só exige 11 dígitos numéricos, e inventar uma regra mais rígida na tela recusaria cadastros que a API aceita | aberta | — |
| ASM-007 | Excluir investidor com carteiras é permitido e não precisa de aviso especial: a exclusão é lógica e as carteiras permanecem no banco | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-002 | Excluir um investidor que tem carteiras e operações deveria avisar o usuário do que fica órfão, ou seguir em silêncio como o backend faz? | aberta | — |
