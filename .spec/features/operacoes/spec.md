# Spec: Operações

> feature: operacoes
> status: rascunho

## Contexto

A pessoa investidora simula compras e vendas dentro de uma carteira para ver como uma
tese se comporta sem movimentar dinheiro real. No backend a operação é a fonte da
verdade: cada compra, venda ou exclusão faz o histórico daquele par carteira/ação ser
relido e a posição ser recalculada do zero — quantidade e preço médio nunca são
escritos diretamente.

Esta feature cobre a tela da carteira (`/carteiras/:id`), onde as posições são
consultadas e onde se compra e vende, e o histórico global de movimentações
(`/movimentacoes`), onde um lançamento errado é excluído. O consolidado do investidor
pertence ao dashboard; criar, renomear e excluir carteira pertencem a `carteiras`.

## Histórias

### US-020 — Consultar as posições de uma carteira

Como investidor, quero abrir uma carteira e ver o que ela tem hoje, para decidir se
compro mais, vendo ou não faço nada.

#### AC-069 — A carteira é localizada pelo endereço mesmo sem endpoint próprio

- **Dado** o endereço de uma carteira do investidor de contexto
- **Quando** a página carrega
- **Então** a carteira é encontrada na listagem do investidor e a tela mostra nome, corretora, mercado e moeda dela
- **E** quando a carteira não está nessa listagem, por ser de outro investidor ou por ter sido excluída, a tela informa que a carteira não foi encontrada e oferece o caminho de volta para a lista

#### AC-070 — Cada posição mostra o que o investidor tem e quanto vale

- **Dado** uma carteira com posições
- **Quando** a tela termina de carregar
- **Então** cada linha mostra ticker, quantidade, preço médio, cotação atual, valor total e rentabilidade não realizada
- **E** a rentabilidade é exibida como valor na moeda da carteira, nunca como percentual vindo do backend

#### AC-071 — O ticker é o rótulo do papel

- **Dado** uma posição cujo nome da empresa não foi devolvido pela API
- **Quando** a linha é exibida
- **Então** o ticker aparece como rótulo do papel
- **E** nenhum travessão ou espaço em branco ocupa o lugar de um nome de empresa

#### AC-072 — Carteira sem posições orienta a primeira compra

- **Dado** que a consulta terminou sem nenhuma posição
- **Quando** a tela é exibida
- **Então** o investidor vê que a carteira ainda não tem ativos
- **E** encontra a ação "Comprar primeiro ativo"

#### AC-073 — Cotação defasada é sinalizada na linha

- **Dado** uma posição cuja cotação foi obtida há mais de trinta minutos numa carteira BR, ou há mais de cinco minutos numa carteira US
- **Quando** a linha é exibida
- **Então** ela mostra um aviso de cotação defasada junto ao horário da cotação
- **E** quando todas as posições estão defasadas, o aviso aparece uma única vez no cabeçalho do card e não se repete linha a linha

#### AC-074 — Valor indisponível vira travessão, nunca zero

- **Dado** uma posição sem cotação ou sem valor calculável
- **Quando** a linha é exibida
- **Então** a célula mostra travessão
- **E** nunca mostra `0,00` nem célula vazia no lugar de um valor que não existe

#### AC-075 — Uma falha ao carregar as posições pode ser tentada novamente

- **Dado** que a consulta das posições falhou
- **Quando** a tela recebe o erro
- **Então** o investidor vê uma mensagem que explica que as posições não puderam ser carregadas
- **E** encontra a ação "Tentar novamente", que repete a consulta

### US-021 — Comprar ações numa carteira

Como investidor, quero registrar a compra de um papel na carteira, para acompanhar essa
posição pelo preço do momento da compra.

#### AC-076 — O formulário de compra pede apenas papel e quantidade

- **Dado** uma carteira aberta
- **Quando** o investidor aciona "Comprar"
- **Então** vê um modal com os campos papel e quantidade, e nenhum campo de preço
- **E** a identificação da carteira vem da tela e não aparece no formulário

#### AC-077 — O seletor de papel só oferece ações do mercado da carteira

- **Dado** uma carteira do mercado BR e um catálogo com ações BR e US
- **Quando** o investidor abre o formulário de compra
- **Então** o seletor lista somente as ações do mercado da carteira
- **E** não existe seleção possível que resulte em recusa por mercado incompatível

#### AC-078 — A compra usa a cotação do momento, nunca um preço digitado

- **Dado** um formulário de compra válido
- **Quando** o investidor confirma a compra
- **Então** a operação é registrada com o preço unitário devolvido pelo backend
- **E** a tela em nenhum momento aceita ou envia um preço informado pelo investidor

#### AC-079 — Compras sucessivas atualizam o preço médio da posição

- **Dado** uma carteira que já tem posição num papel
- **Quando** o investidor compra mais desse mesmo papel
- **Então** a tela relê as posições no backend em vez de recalcular localmente
- **E** a linha passa a mostrar a nova quantidade e o novo preço médio

#### AC-080 — Fonte de cotação indisponível não registra a compra

- **Dado** um formulário de compra válido
- **Quando** a fonte externa de cotação está fora do ar
- **Então** nenhuma posição é criada ou alterada
- **E** o investidor vê uma mensagem que atribui a falha à fonte de cotação, com a ação de tentar de novo

#### AC-081 — Uma falha na compra preserva o trabalho do investidor

- **Dado** um formulário de compra preenchido
- **Quando** a API recusa ou não consegue concluir a operação
- **Então** o modal permanece aberto com papel e quantidade preenchidos
- **E** a mensagem recebida do backend é exibida junto à ação de tentar novamente

### US-022 — Vender ações de uma carteira

Como investidor, quero registrar a venda de um papel que tenho, para simular a saída
daquela posição.

#### AC-082 — A venda só é oferecida para papel em posição

- **Dado** uma carteira com posições
- **Quando** a tela é exibida
- **Então** a ação de vender aparece apenas nas linhas dos papéis que a carteira possui
- **E** o formulário de venda já vem com o papel daquela linha

#### AC-083 — Quantidade acima da posição é recusada com o motivo do backend

- **Dado** uma posição de dez unidades de um papel
- **Quando** o investidor tenta vender mais do que possui
- **Então** a venda não é concluída e a posição permanece inalterada
- **E** a mensagem devolvida pelo backend, que informa a quantidade disponível, é exibida como veio

#### AC-084 — Venda que zera a posição a remove da tela

- **Dado** uma posição e uma venda da quantidade total
- **Quando** a operação é concluída
- **Então** a tela relê as posições e o papel deixa de aparecer na carteira
- **E** o lançamento continua disponível no histórico de movimentações

### US-023 — Consultar o histórico de movimentações

Como investidor, quero ver todos os meus lançamentos, para conferir o que registrei e
encontrar um erro.

#### AC-085 — O histórico lista os lançamentos do mais recente para o mais antigo

- **Dado** um investidor com lançamentos em mais de uma carteira
- **Quando** ele abre o histórico de movimentações
- **Então** vê os lançamentos de todas as suas carteiras, do mais recente para o mais antigo
- **E** a lista é paginada, com navegação entre as páginas disponíveis

#### AC-086 — Cada lançamento é identificável na linha

- **Dado** um lançamento no histórico
- **Quando** a linha é exibida
- **Então** ela mostra tipo (compra ou venda), papel, quantidade, preço unitário e data e hora
- **E** compra e venda são distinguíveis por texto, não apenas por cor

#### AC-087 — Histórico vazio orienta o primeiro lançamento

- **Dado** um investidor sem nenhuma movimentação
- **Quando** ele abre o histórico
- **Então** vê que ainda não registrou lançamentos
- **E** encontra o caminho para suas carteiras, onde a compra é feita

#### AC-088 — O histórico não promete um filtro que não existe

- **Dado** um investidor com lançamentos de várias carteiras e papéis
- **Quando** ele abre o histórico
- **Então** a tela não oferece filtro por carteira, papel, tipo ou período
- **E** deixa explícito que a lista é de todas as carteiras do investidor

#### AC-089 — Uma falha ao carregar o histórico pode ser tentada novamente

- **Dado** que a consulta do histórico falhou
- **Quando** a tela recebe o erro
- **Então** o investidor vê uma mensagem que explica que os lançamentos não puderam ser carregados
- **E** encontra a ação "Tentar novamente", que repete a consulta da página atual

### US-024 — Corrigir um lançamento errado

Como investidor, quero desfazer um lançamento que registrei errado, para que minhas
posições voltem a refletir a realidade da simulação.

#### AC-090 — Corrigir é excluir e lançar de novo

- **Dado** um lançamento no histórico
- **Quando** o investidor procura corrigi-lo
- **Então** a tela oferece apenas excluir o lançamento, e nenhuma edição de quantidade ou preço
- **E** a orientação da tela indica que a correção é feita excluindo e registrando novamente

#### AC-091 — A exclusão de um lançamento exige confirmação

- **Dado** um lançamento no histórico
- **Quando** o investidor aciona "Excluir"
- **Então** vê um modal que informa que o lançamento será apagado e que as posições serão recalculadas
- **E** cancelar ou fechar o modal não envia nenhuma requisição

#### AC-092 — O lançamento excluído sai da lista e a posição é recalculada

- **Dado** uma exclusão confirmada
- **Quando** a API conclui a operação
- **Então** a página atual do histórico é recarregada e o lançamento não aparece mais
- **E** ao voltar para a carteira afetada, as posições exibidas vêm do backend já recalculadas

#### AC-093 — Uma falha na exclusão não remove o lançamento da tela

- **Dado** uma exclusão confirmada pelo investidor
- **Quando** a API não consegue concluir a operação
- **Então** o lançamento permanece na lista e o modal continua aberto
- **E** a mensagem recebida do backend é exibida com uma ação para tentar novamente

## Fora de escopo

- Editar quantidade ou preço de um lançamento já registrado.
- Filtrar o histórico por carteira, papel, tipo ou período.
- Consolidado do investidor, indicadores agregados e gráficos.
- Criar, renomear ou excluir carteira.
- Cadastrar ações, atualizar cotação ou excluir ação do catálogo.
- Saldo em dinheiro: a compra não verifica caixa disponível.
- Somar valores de carteiras BR e US ou fazer conversão cambial.
- Resultado realizado de vendas: não existe campo nem endpoint.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-019 | Nenhum investidor tem mais de cem carteiras, então uma única página grande basta para localizar a carteira do endereço no cliente | aberta | — |
| ASM-020 | O volume de lançamentos por investidor cabe na paginação padrão, sem necessidade de filtro no servidor | aberta | — |
| ASM-021 | Excluir e relançar é correção suficiente; a edição de lançamento não é usada porque o backend não revalida se a nova quantidade deixa a posição negativa | confirmada | Decisão D-08 do design do MVP |
| ASM-022 | O seletor de papel do formulário de compra carrega todas as páginas do catálogo de ações ao abrir, como o seletor de corretoras faz em `carteiras` | aberta | — |
| ASM-023 | A carteira aberta pelo endereço sempre pertence ao investidor de contexto; carteira de outro investidor é tratada como não encontrada, não como acesso negado | confirmada | O backend não tem autenticação; a listagem por investidor é o único filtro disponível |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-009 | A tela da carteira, com posições e compra e venda, pertence a `operacoes` ou a `dashboard`? | respondida | A `operacoes`: posições, compra e venda ficam juntas, e `dashboard` fica só com o consolidado do investidor |
| Q-010 | A resposta do histórico identifica de qual carteira veio cada lançamento? | aberta | — |
| Q-011 | Quantas páginas do catálogo de ações o seletor de compra deve carregar antes de liberar o formulário? | aberta | — |
| Q-012 | Ao excluir o último lançamento de uma página do histórico, a tela deve voltar para a página anterior, como em `carteiras`? | aberta | — |
