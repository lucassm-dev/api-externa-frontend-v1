# Spec: Dashboard

> feature: dashboard
> status: rascunho

## Contexto

O dashboard é a porta de entrada da aplicação: é para onde a rota raiz leva e é onde a
pessoa investidora descobre como estão suas simulações sem precisar abrir carteira por
carteira.

São **duas telas**, não uma. O consolidado por moeda fica em `/dashboard` e o histórico
de aportes em `/dashboard/aportes`. Separar não é organização: o consolidado já custa uma
consulta de carteiras mais uma por carteira, e juntar o histórico na mesma tela faria
quem só quer ver quanto tem pagar por uma consulta que não pediu. Separadas, uma falha
no histórico não tem como afetar os valores do consolidado — a garantia deixa de depender
de tratamento de erro e passa a ser estrutural.

O backend não tem nenhum endpoint de agregado. O consolidado é montado no cliente a
partir das carteiras do investidor e das posições de cada uma, o que custa uma consulta
de carteiras mais uma por carteira, mais o histórico do gráfico. Como carteiras BR são
expressas em BRL e carteiras US em USD, e não há conversão cambial, o consolidado é
sempre apresentado por moeda, lado a lado, nunca somado.

Esta feature cobre apenas essas duas telas. Abrir uma carteira, comprar, vender e excluir
lançamento pertencem a `operacoes`; criar, renomear e excluir carteira pertencem a
`carteiras`.

## Histórias

### US-025 — Ver o consolidado das minhas carteiras

Como investidor, quero ver quanto minhas carteiras valem hoje e quanto já ganhei ou
perdi, para saber se preciso agir sem abrir cada carteira.

#### AC-094 — Cada moeda tem seu próprio bloco

- **Dado** um investidor com carteiras BR e carteiras US
- **Quando** o dashboard termina de carregar
- **Então** ele vê dois blocos separados, um em BRL e outro em USD, cada um identificando sua moeda
- **E** cada bloco informa quantas carteiras entraram naquela conta

#### AC-095 — Nenhum número soma moedas diferentes

- **Dado** um investidor com carteiras nas duas moedas
- **Quando** o dashboard é exibido
- **Então** não existe na tela nenhum total que combine valores em BRL e em USD
- **E** nenhuma conversão cambial é apresentada

#### AC-096 — Cada bloco mostra investido, valor atual e resultado

- **Dado** um bloco de moeda com pelo menos uma posição
- **Quando** ele é exibido
- **Então** mostra o valor investido, o valor atual e a rentabilidade não realizada, todos na moeda do bloco
- **E** a rentabilidade não realizada é apresentada como valor na moeda, e não como um percentual devolvido pelo backend

#### AC-097 — O percentual é calculado na tela

- **Dado** um bloco com valor investido maior que zero
- **Quando** o percentual de rentabilidade é exibido
- **Então** ele resulta da razão entre o resultado e o valor investido daquele bloco
- **E** quando o valor investido é zero, o percentual aparece como travessão, nunca como zero por cento

#### AC-098 — Moeda sem carteira não vira bloco zerado

- **Dado** um investidor que só tem carteiras BR
- **Quando** o dashboard é exibido
- **Então** nenhum bloco USD zerado é apresentado
- **E** a tela não sugere que exista uma posição em dólar valendo zero

#### AC-099 — Investidor sem carteiras encontra o primeiro passo

- **Dado** um investidor sem nenhuma carteira ativa
- **Quando** o dashboard é exibido
- **Então** ele vê que ainda não tem carteiras para consolidar
- **E** encontra a ação "Criar primeira carteira", que leva à página de carteiras

### US-026 — Confiar no que o dashboard mostra enquanto ele carrega

Como investidor, quero saber o que já carregou e o que falhou, para não tomar decisão
com base num total incompleto.

#### AC-100 — Cada bloco carrega e aparece por conta própria

- **Dado** que as consultas do consolidado ainda não terminaram
- **Quando** a tela é exibida
- **Então** cada bloco de moeda mostra seu próprio skeleton, com a dimensão do conteúdo real
- **E** um bloco que já recebeu seus dados é preenchido sem esperar os demais

#### AC-101 — Falha em uma carteira não derruba a tela

- **Dado** um investidor com várias carteiras na mesma moeda
- **Quando** a consulta das posições de uma delas falha
- **Então** o bloco daquela moeda continua sendo exibido com as carteiras que responderam
- **E** os demais blocos e o gráfico permanecem intactos

#### AC-102 — Total parcial nunca se passa por total completo

- **Dado** um bloco de moeda em que nem todas as carteiras responderam
- **Quando** ele é exibido
- **Então** informa que o resultado é parcial e quantas carteiras entraram na conta
- **E** oferece a ação de tentar novamente para as carteiras que faltaram

#### AC-103 — Falha ao listar as carteiras impede o consolidado inteiro

- **Dado** que a consulta das carteiras do investidor falhou
- **Quando** o dashboard recebe o erro
- **Então** nenhum bloco de moeda é exibido com valores
- **E** a tela mostra uma mensagem de falha com a ação "Tentar novamente", que repete a consulta

#### AC-104 — Nenhum número aparece sem o horário da cotação que o gerou

- **Dado** um bloco de moeda com valores calculados a partir de cotações
- **Quando** ele é exibido
- **Então** o bloco mostra o horário da cotação mais antiga que entrou na conta
- **E** nenhum valor atual ou rentabilidade é exibido sem esse horário disponível na tela

#### AC-105 — Consolidado com cotação defasada é sinalizado

- **Dado** um bloco cuja cotação mais antiga passou do limiar da própria fonte, trinta minutos para BR e cinco minutos para US
- **Quando** ele é exibido
- **Então** mostra um aviso de que o consolidado usa cotação defasada
- **E** o aviso não é comunicado apenas por cor

### US-027 — Ver meu histórico de aportes

Como investidor, quero ver como meus aportes se distribuíram ao longo do tempo, para
entender meu próprio ritmo de simulação. Esta é a tela `/dashboard/aportes`, separada do
consolidado.

#### AC-106 — O gráfico mostra compras e vendas do histórico

- **Dado** um investidor com lançamentos de compra e de venda
- **Quando** o gráfico é exibido
- **Então** ele apresenta os lançamentos ao longo do tempo, separando compras de vendas
- **E** não apresenta nenhuma série de evolução de cotação ou de patrimônio, que o backend não fornece

#### AC-107 — Compra e venda se distinguem sem depender de cor

- **Dado** o gráfico com compras e vendas
- **Quando** ele é exibido
- **Então** cada série é identificável por rótulo ou legenda textual
- **E** a informação continua compreensível sem percepção de cor

#### AC-108 — Investidor sem movimentações vê um estado vazio, não um eixo vazio

- **Dado** um investidor sem nenhum lançamento
- **Quando** a área do gráfico é exibida
- **Então** ela mostra que ainda não há movimentações para exibir
- **E** não desenha eixos, grade ou série vazia

#### AC-109 — Uma falha no histórico pode ser tentada novamente

- **Dado** que a consulta do histórico falhou
- **Quando** a tela de aportes recebe o erro
- **Então** o investidor vê uma mensagem que explica que o histórico não pôde ser carregado
- **E** encontra a ação "Tentar novamente", que repete a consulta

#### AC-110 — As duas telas do dashboard se alcançam

- **Dado** um investidor no consolidado
- **Quando** ele procura o histórico de aportes
- **Então** encontra o caminho para a tela de aportes e consegue voltar ao consolidado
- **E** a navegação indica qual das duas está aberta

## Fora de escopo

- Somar carteiras BR e US ou converter câmbio.
- Resultado realizado de vendas: não existe campo nem endpoint no backend.
- Série histórica de cotação ou evolução de patrimônio no tempo.
- Alocação por setor, por corretora ou por classe de ativo.
- Abrir carteira, comprar, vender ou excluir lançamento.
- Criar, renomear ou excluir carteira.
- Botão de atualizar todas as cotações: as cotas das fontes externas são compartilhadas por toda a aplicação.
- Escolher período, filtrar ou exportar o consolidado.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-024 | Uma única página grande de carteiras basta para o consolidado, porque nenhum investidor tem mais de cem carteiras | aberta | — |
| ASM-025 | O custo de uma consulta por carteira é aceitável no MVP, dado o número pequeno de carteiras por investidor | aberta | — |
| ASM-026 | Valor total e rentabilidade não realizada vêm prontos por posição, e a agregação por moeda é soma simples na tela | confirmada | Contrato de `GET /carteiras/{id}/posicoes` levantado em `docs/api/backend-api.md` |
| ASM-027 | A consulta de posições devolve lista vazia tanto para carteira sem posições quanto para carteira inexistente, e o dashboard trata os dois casos como zero | confirmada | Comportamento documentado em `docs/api/backend-api.md` |
| ASM-028 | O valor investido de uma posição é a quantidade multiplicada pelo preço médio, calculado na tela, já que o backend não devolve esse campo | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-013 | O gráfico agrupa os lançamentos por dia, por mês, ou plota lançamento a lançamento? | aberta | — |
| Q-014 | O gráfico é único, misturando as duas moedas por contagem de lançamentos, ou são dois gráficos, um por moeda? | aberta | — |
| Q-015 | O gráfico usa alguma biblioteca ou é desenhado com os recursos já disponíveis no projeto? | aberta | — |
| Q-016 | O horário exibido no bloco deve ser o da cotação mais antiga da conta, ou o da consulta mais recente? | aberta | — |
