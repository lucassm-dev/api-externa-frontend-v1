# Spec: Corretoras

> feature: corretoras
> status: rascunho

<!--
  Insumos: docs/api/backend-api.md (§ Corretoras), decisão D-10 do design.
  Códigos globais e contínuos — esta feature começa em US-008 / AC-024.
-->

## Contexto

O investidor cadastra corretoras informando **apenas o CNPJ**; o backend enriquece com os
dados da Receita, confirma a autorização na CVM e resolve o endereço pelo CEP. Corretora
não autorizada — ou não verificável — não é cadastrada. É um catálogo global: o CNPJ é
único no sistema inteiro e a lista não depende do investidor de contexto.

O cadastro é lento porque encadeia três consultas externas em série, e essa espera precisa
aparecer na tela.

## Histórias

### US-008 — Cadastrar corretora pelo CNPJ

Como investidor, quero cadastrar uma corretora informando só o CNPJ, para que o sistema
preencha o resto a partir de fontes públicas.

#### AC-024 — CNPJ malformado é barrado antes de qualquer consulta

- **Dado** que informo um CNPJ fora do formato aceito
- **Quando** envio o cadastro
- **Então** vejo o erro no campo do CNPJ e nenhuma corretora é criada

#### AC-025 — CNPJ de corretora autorizada é cadastrado com os dados enriquecidos

- **Dado** um CNPJ válido de corretora autorizada na CVM
- **Quando** envio o cadastro
- **Então** a corretora é criada e a tela mostra razão social, endereço e a situação na CVM
  como validada, acompanhada da data da base usada na verificação

#### AC-026 — A espera pelas consultas externas aparece na tela

- **Dado** que enviei um cadastro de corretora
- **Quando** o sistema está consultando as fontes externas
- **Então** o formulário fica bloqueado e vejo um aviso de que a consulta está em
  andamento, em vez de um botão que parece não ter funcionado

#### AC-027 — Corretora recusada mostra o motivo que veio do sistema

- **Dado** um CNPJ que o sistema recusa por regra de negócio — não autorizada na CVM, fora
  da base da Receita, ou dígitos verificadores inválidos
- **Quando** envio o cadastro
- **Então** a corretora não é criada e a tela exibe o motivo exato informado pelo sistema,
  sem substituí-lo por um texto genérico

#### AC-028 — Falha ao verificar a CVM não acusa a corretora de irregular

- **Dado** um CNPJ cuja autorização na CVM não pôde ser verificada
- **Quando** envio o cadastro
- **Então** a corretora não é criada e a mensagem exibida diz que a **verificação falhou** —
  nunca que a corretora é irregular

#### AC-029 — CNPJ já cadastrado é impedido

- **Dado** que já existe uma corretora com aquele CNPJ
- **Quando** tento cadastrar o mesmo CNPJ
- **Então** a corretora não é duplicada e a tela informa que o CNPJ já está cadastrado

### US-009 — Consultar as corretoras cadastradas

Como investidor, quero ver as corretoras cadastradas, para escolhê-las ao criar carteiras.

#### AC-030 — Lista paginada mostra CNPJ, nome e situação na CVM

- **Dado** que existem corretoras cadastradas
- **Quando** abro a lista de corretoras
- **Então** vejo uma tabela paginada com CNPJ, razão social e um selo indicando a situação
  na CVM

#### AC-031 — Lista vazia orienta o cadastro

- **Dado** que não há corretoras cadastradas
- **Quando** abro a lista
- **Então** vejo um estado vazio que me convida a cadastrar a primeira corretora

#### AC-032 — Campos que a fonte não devolveu não viram lacuna visual

- **Dado** uma corretora cujo endereço ou contato voltou vazio das fontes externas
- **Quando** vejo seus dados
- **Então** os campos ausentes aparecem como indisponíveis de forma explícita, sem célula
  em branco nem texto quebrado

### US-010 — Buscar corretora pelo CNPJ

Como investidor, quero buscar uma corretora pelo CNPJ, para encontrá-la rápido e saber se
já está cadastrada.

#### AC-033 — Busca por CNPJ cadastrado mostra a corretora

- **Dado** um CNPJ já cadastrado
- **Quando** busco por ele, com ou sem pontuação
- **Então** a corretora correspondente é exibida

#### AC-034 — Busca sem resultado informa sem quebrar a tela

- **Dado** um CNPJ que não está cadastrado
- **Quando** busco por ele
- **Então** a tela informa que nenhuma corretora foi encontrada e a lista continua
  utilizável

### US-011 — Excluir corretora

Como investidor, quero excluir uma corretora que não uso, para manter o catálogo enxuto.

#### AC-035 — Excluir pede confirmação e some da lista

- **Dado** uma corretora na lista
- **Quando** escolho excluir e confirmo
- **Então** ela deixa de aparecer na lista de corretoras

## Fora de escopo

- **Editar corretora** — o backend não expõe atualização, e por desenho: todo dado
  cadastral vem de fonte externa, nenhum é digitado.
- **Classificar os erros da CVM no cliente** — os dois casos chegam com o mesmo código e
  são distinguidos só pelo texto, que já vem escrito para pessoas (decisão D-10).
- **Traduzir o código de situação cadastral da Receita** — chega como número (`"2"`) e não
  há tabela de significados confiável no escopo do MVP.
- Ingestão e atualização da base da CVM — responsabilidade do backend.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-008 | Exibir a mensagem do sistema tal como veio atende tanto a corretora recusada quanto a verificação que falhou, porque os dois textos já explicam a diferença ao usuário | confirmada | Decisão D-10, mensagens conferidas no `CorretoraService` e no `CvmFacade` |
| ASM-009 | O cadastro pode demorar dezenas de segundos, já que encadeia três consultas externas; a tela espera indefinidamente e deixa o sistema decidir quando desistir | confirmada | Decisão da seção 2 do design |
| ASM-010 | A situação cadastral é exibida como veio, sem interpretação, e o selo da CVM (validada / data da base) é o que comunica confiança ao usuário | aberta | — |
| ASM-011 | Excluir corretora usada por carteiras existentes é permitido; as carteiras seguem apontando para ela e continuam exibindo o nome | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-003 | Excluir uma corretora que já está em uso por carteiras deveria avisar quantas carteiras dependem dela? Descobrir isso custa uma varredura das carteiras de todos os investidores, que a API não oferece | aberta | — |
