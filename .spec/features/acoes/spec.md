# Spec: Acoes

> feature: acoes
> status: rascunho

<!--
  Insumos: docs/api/backend-api.md (§ Ações, § APIs externas), decisão D-06 do design.
  Códigos globais e contínuos — esta feature começa em US-012 / AC-036.
-->

## Contexto

Catálogo global de papéis. Cadastrar uma ação já busca a cotação na fonte do mercado
escolhido — se o ticker não existe lá, o cadastro não acontece. Nenhuma cotação do sistema é
ao vivo: vem de fontes gratuitas com atraso de minutos (mercado americano) a meia hora
(mercado brasileiro), e só muda quando alguém manda atualizar. Por isso toda cotação
exibida carrega o horário em que foi obtida, e o quão velha ela está é informação de tela.

## Histórias

### US-012 — Cadastrar ação por ticker e mercado

Como investidor, quero cadastrar uma ação informando ticker e mercado, para que ela entre
no catálogo com a cotação atual.

#### AC-036 — Ticker válido é cadastrado com cotação e horário

- **Dado** um ticker existente e o mercado correspondente
- **Quando** envio o cadastro
- **Então** a ação é criada e a tela mostra ticker, mercado, moeda, cotação atual e o
  horário em que essa cotação foi obtida

#### AC-037 — Ticker inexistente na fonte é recusado com o motivo

- **Dado** um ticker que não existe na fonte do mercado escolhido
- **Quando** envio o cadastro
- **Então** a ação não é criada e a tela informa que o ticker não foi encontrado naquela
  fonte

#### AC-038 — Ticker já cadastrado é impedido

- **Dado** que o ticker já está no catálogo
- **Quando** tento cadastrá-lo de novo
- **Então** a ação não é duplicada e a tela informa que o ticker já está cadastrado

#### AC-039 — Fonte fora do ar impede o cadastro e explica por quê

- **Dado** que a fonte de cotação está indisponível ou com a cota esgotada
- **Quando** envio o cadastro
- **Então** a ação não é criada e a tela diz que a falha é da fonte externa, oferecendo
  tentar de novo, em vez de sugerir que o ticker está errado

### US-013 — Consultar o catálogo de ações

Como investidor, quero ver e buscar as ações do catálogo, para escolher onde operar.

#### AC-040 — Lista paginada mostra cotação com o horário de cada linha

- **Dado** que existem ações cadastradas
- **Quando** abro a lista
- **Então** vejo uma tabela paginada com ticker, mercado, cotação atual e o horário da
  cotação em cada linha

#### AC-041 — Busca por ticker mostra a ação

- **Dado** um ticker cadastrado
- **Quando** busco por ele, em maiúsculas ou minúsculas
- **Então** a ação correspondente é exibida

#### AC-042 — Catálogo vazio ou busca sem resultado orienta o cadastro

- **Dado** que não há ações cadastradas ou que a busca não encontrou o ticker
- **Quando** a tela termina de carregar
- **Então** vejo um estado vazio que me convida a cadastrar aquela ação

#### AC-043 — O ticker é o rótulo do papel

- **Dado** uma ação no catálogo ou numa posição de carteira
- **Quando** ela é exibida em qualquer tela
- **Então** o ticker é o identificador visível do papel, e nenhuma tela reserva espaço para
  um nome de empresa

### US-014 — Saber o quão atual está a cotação

Como investidor, quero saber quando cada cotação foi obtida e poder atualizá-la, porque os
preços exibidos podem estar defasados.

#### AC-044 — Cotação além do limiar do mercado é sinalizada

- **Dado** uma cotação obtida há mais tempo que o limiar do seu mercado — 30 minutos no
  mercado brasileiro, 5 minutos no americano
- **Quando** vejo a ação
- **Então** o valor aparece acompanhado de um aviso de atraso, sem esconder o número nem
  substituí-lo

#### AC-045 — Defasagem geral vira um aviso só, não um por linha

- **Dado** que todas as cotações exibidas na tela estão além do limiar
- **Quando** vejo a lista
- **Então** o aviso de atraso aparece uma vez no cabeçalho e as linhas ficam limpas, em vez
  de repetir o mesmo aviso em cada uma

#### AC-046 — Atualizar cotação traz preço e horário novos

- **Dado** uma ação com cotação possivelmente defasada
- **Quando** peço para atualizar a cotação
- **Então** a tela passa a mostrar a cotação nova e o novo horário de obtenção

#### AC-047 — Atualização que não trouxe dado novo avisa sem virar erro

- **Dado** que a fonte estava indisponível quando pedi para atualizar
- **Quando** a resposta chega trazendo o mesmo horário de antes
- **Então** a tela avisa que não foi possível atualizar agora e mantém a última cotação
  conhecida visível, sem exibir erro de tela inteira

### US-015 — Excluir ação do catálogo

Como investidor, quero excluir uma ação que não acompanho, para manter o catálogo enxuto.

#### AC-048 — Excluir pede confirmação e some da lista

- **Dado** uma ação no catálogo
- **Quando** escolho excluir e confirmo
- **Então** ela deixa de aparecer na lista de ações

## Fora de escopo

- **Histórico de cotações e gráfico de preço** — o backend guarda um único preço por ação,
  sem série temporal.
- **Atualizar todas as cotações de uma vez** — as fontes gratuitas têm cota compartilhada
  por toda a aplicação (8 requisições por minuto no mercado americano), então um botão de
  atualização em massa esgotaria a cota rapidamente.
- **Editar ticker ou mercado** — o backend só expõe atualizar cotação.
- **Conversão de moeda entre mercados** — cada ação é exibida na moeda do seu mercado.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-012 | O limiar de defasagem sai do atraso característico de cada fonte, e não de horário de pregão: fora do pregão tudo estoura o limiar, e a regra do aviso único no cabeçalho é o que evita poluir a tela | confirmada | Decisão D-06 do design |
| ASM-013 | A defasagem é calculada na tela comparando o horário da cotação com o horário atual; não existe campo de frescor vindo do sistema | confirmada | Confirmado no `AcaoResponseDTO` |
| ASM-014 | Comparar o horário da cotação antes e depois de atualizar é suficiente para saber se a atualização funcionou, já que o sistema responde com sucesso mesmo quando a fonte falha | confirmada | Confirmado no `AcaoService.atualizarCotacao` |
| ASM-015 | Uma ação excluída que ainda tem posição em alguma carteira continua aparecendo na posição; a tela da carteira não precisa tratar esse caso de forma especial | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-004 | O aviso de atraso deve mostrar há quanto tempo a cotação foi obtida ("há 2 h") ou o horário absoluto ("18:30")? O relativo comunica melhor o risco; o absoluto é o que a regra de negócio pede literalmente | aberta | — |
