# Spec: Carteiras

> feature: carteiras
> status: rascunho

## Contexto

A pessoa investidora usa carteiras de acompanhamento para separar teses de
investimento sem movimentar dinheiro real. Cada carteira pertence ao investidor
selecionado no contexto da aplicação, usa uma corretora ativa e pertence a um
único mercado: BR, expresso em BRL, ou US, expresso em USD.

Esta feature cobre somente o gerenciamento das carteiras. Posições,
rentabilidade, compras e vendas pertencem às features de dashboard e operações.

## Histórias

### US-016 — Consultar minhas carteiras

Como investidor, quero consultar minhas carteiras, para escolher e organizar as
simulações que acompanho.

#### AC-049 — A lista mostra somente as carteiras do investidor atual

- **Dado** um investidor selecionado no contexto da aplicação
- **Quando** ele abre a página de carteiras
- **Então** vê somente as carteiras ativas vinculadas a esse investidor
- **E** cada linha mostra nome, corretora, mercado, moeda e ações disponíveis

#### AC-050 — A lista é paginada e ordenada por nome

- **Dado** um investidor com mais de dez carteiras ativas
- **Quando** ele abre a página ou muda de página
- **Então** vê até dez carteiras por página, ordenadas por nome e depois por identificador
- **E** consegue avançar e voltar pelas páginas disponíveis

#### AC-051 — O carregamento preserva a estrutura da tabela

- **Dado** que a consulta das carteiras ainda não terminou
- **Quando** a página é exibida
- **Então** o investidor vê um skeleton com a estrutura da tabela
- **E** não vê ao mesmo tempo mensagens de lista vazia ou erro

#### AC-052 — A primeira carteira pode ser criada a partir do estado vazio

- **Dado** que a consulta terminou sem nenhuma carteira ativa
- **Quando** a página é exibida
- **Então** o investidor vê que ainda não possui carteiras
- **E** encontra a ação "Criar primeira carteira"

#### AC-053 — Uma falha na listagem pode ser tentada novamente

- **Dado** que a consulta das carteiras falhou
- **Quando** a página recebe o erro
- **Então** o investidor vê uma mensagem que explica que as carteiras não puderam ser carregadas
- **E** encontra a ação "Tentar novamente", que repete a consulta da página atual

### US-017 — Criar uma carteira

Como investidor, quero criar uma carteira vinculada a uma corretora e a um
mercado, para acompanhar uma nova tese separadamente.

#### AC-054 — O formulário solicita apenas os dados editáveis da carteira

- **Dado** um investidor selecionado no contexto da aplicação
- **Quando** ele aciona "Nova carteira"
- **Então** vê um modal com os campos nome, corretora e mercado BR ou US
- **E** o identificador do investidor é obtido do contexto e não aparece no formulário

#### AC-055 — Todas as corretoras ativas ficam disponíveis

- **Dado** que as corretoras ativas ocupam mais de uma página da API
- **Quando** o investidor abre o formulário de nova carteira
- **Então** o seletor carrega todas as páginas e mostra cada corretora ativa uma única vez
- **E** o botão de salvar permanece indisponível enquanto esse carregamento não termina

#### AC-056 — Sem corretora ativa, a criação orienta o próximo passo

- **Dado** que não existe nenhuma corretora ativa disponível
- **Quando** o investidor abre o formulário de nova carteira
- **Então** o formulário não permite salvar a carteira
- **E** mostra a ação "Cadastrar corretora", que leva à página de corretoras

#### AC-057 — Os dados obrigatórios são validados antes do envio

- **Dado** o formulário de nova carteira aberto
- **Quando** o investidor tenta salvar sem nome, corretora ou mercado, ou informa um nome com mais de 255 caracteres
- **Então** a carteira não é enviada e cada campo inválido mostra uma orientação junto a ele
- **E** espaços no início e no fim do nome são removidos antes da validação e do envio

#### AC-058 — O mercado define a moeda exibida

- **Dado** um formulário válido com uma corretora ativa
- **Quando** o investidor cria uma carteira BR ou US
- **Então** a nova carteira aparece na lista com BRL para mercado BR ou USD para mercado US
- **E** a página não exibe total consolidado que some valores em moedas diferentes

#### AC-059 — Múltiplas carteiras e nomes repetidos são permitidos

- **Dado** que o investidor já possui uma carteira com determinado nome
- **Quando** cria outra carteira válida, inclusive com o mesmo nome
- **Então** as duas carteiras aparecem separadamente na lista
- **E** nenhuma mensagem de duplicidade é exibida

#### AC-060 — Uma falha na criação preserva o trabalho do investidor

- **Dado** um formulário de nova carteira válido
- **Quando** a API recusa ou não consegue concluir a criação
- **Então** o modal permanece aberto com nome, corretora e mercado preenchidos
- **E** a mensagem recebida do backend é exibida com uma ação para tentar salvar novamente

### US-018 — Renomear uma carteira

Como investidor, quero renomear uma carteira, para manter minhas simulações
organizadas sem alterar seu mercado ou sua corretora.

#### AC-061 — A renomeação permite alterar somente o nome

- **Dado** uma carteira ativa exibida na lista
- **Quando** o investidor aciona "Renomear"
- **Então** vê um modal preenchido com o nome atual e nenhum campo para mercado ou corretora

#### AC-062 — Renomear preserva os demais dados da carteira

- **Dado** o modal de renomeação com um nome válido
- **Quando** o investidor salva a alteração
- **Então** a lista passa a mostrar o novo nome e uma confirmação de sucesso
- **E** corretora, mercado e moeda permanecem iguais aos valores anteriores

#### AC-063 — O novo nome segue as mesmas regras da criação

- **Dado** o modal de renomeação aberto
- **Quando** o investidor informa apenas espaços ou mais de 255 caracteres
- **Então** a alteração não é enviada e o campo nome mostra a orientação correspondente
- **E** espaços no início e no fim são removidos de um nome válido

#### AC-064 — Carteira indisponível é retirada da visão atual

- **Dado** que a carteira foi excluída ou ficou indisponível após a listagem
- **Quando** o investidor tenta renomeá-la e a API informa que ela não existe ou está inativa
- **Então** o modal é fechado, a página atual é recarregada e a carteira deixa de aparecer
- **E** o investidor é avisado de que ela não está mais disponível

### US-019 — Excluir uma carteira

Como investidor, quero excluir uma carteira que não acompanho mais, para
retirá-la das minhas listagens sem apagar seu histórico no backend.

#### AC-065 — A exclusão exige digitar o nome da carteira

- **Dado** uma carteira ativa exibida na lista
- **Quando** o investidor aciona "Excluir"
- **Então** vê um modal que informa que a carteira sairá das listagens, mas seu histórico será preservado
- **E** o botão destrutivo só é habilitado quando o nome da carteira é digitado exatamente

#### AC-066 — Cancelar a confirmação não altera a carteira

- **Dado** o modal de exclusão aberto
- **Quando** o investidor cancela ou fecha o modal antes de confirmar
- **Então** nenhuma requisição de exclusão é enviada e a carteira permanece na lista

#### AC-067 — A carteira excluída desaparece da listagem

- **Dado** o nome correto digitado no modal de exclusão
- **Quando** a API confirma a exclusão lógica
- **Então** o modal é fechado, a carteira é removida da página e uma confirmação de sucesso é exibida
- **E** se a última linha da página foi removida, a página anterior válida é carregada

#### AC-068 — Uma falha na exclusão não remove a carteira da tela

- **Dado** uma exclusão confirmada pelo investidor
- **Quando** a API não consegue concluir a operação
- **Então** a carteira permanece na lista e o modal continua aberto
- **E** a mensagem recebida do backend é exibida com uma ação para tentar novamente

## Fora de escopo

- Exibir posições, composição, patrimônio ou rentabilidade da carteira.
- Comprar, vender, editar ou excluir operações.
- Somar valores de carteiras BR e US ou fazer conversão cambial.
- Alterar mercado ou corretora depois da criação.
- Restaurar ou listar carteiras inativas.
- Implementar autenticação ou permitir escolher manualmente outro investidor no formulário.

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-016 | A página recebe um investidor válido do contexto global; quando não existe contexto, o fluxo de fundação redireciona para o seletor antes de Carteiras | confirmada | Contrato definido na feature `fundacao` |
| ASM-017 | Mercado e corretora são imutáveis depois da criação | confirmada | O backend expõe somente `PATCH /carteiras/{id}` com o campo `nome` |
| ASM-018 | Não há limite de carteiras por investidor nem unicidade de nome entre carteiras ativas | confirmada | PRD e `CarteiraService` do backend não impõem limite ou validação de duplicidade |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-005 | Carteiras deve incluir a visão de posições ou apenas criar, listar, renomear e excluir? | respondida | Apenas gerenciamento; posições, compra e venda ficam em `operacoes` (ver Q-009) e o consolidado por moeda em `dashboard` |
| Q-006 | O que acontece ao criar uma carteira sem nenhuma corretora ativa disponível? | respondida | O formulário fica bloqueado e oferece a ação "Cadastrar corretora" |
| Q-007 | A gestão usa tabela, cards ou páginas separadas? | respondida | Tabela densa, modais para criar e renomear e menu de ações por linha |
| Q-008 | Como carregar corretoras se a API devolver mais de uma página? | respondida | Carregar todas as páginas ao abrir o modal |
