# Design: Carteiras

> feature: carteiras
> estado do desenho: aprovado em conversa em 2026-09-02

## Objetivo e limites

A tela gerencia as carteiras do investidor selecionado no contexto global. Ela
oferece listagem, criação, renomeação e exclusão lógica. Posições e rentabilidade
serão tratadas pelo dashboard; compras e vendas, pela feature de operações.

O desenho segue `docs/design-system-fef-invest.md`. A referência visual de
Investidor10 orienta densidade e navegação, mas não amplia o escopo do MVP.

## Decisões

| ID | Decisão | Motivo |
|---|---|---|
| D-01 | Usar tabela densa com modais e menu de ações por linha | Mantém comparação rápida e segue a persona experiente do produto |
| D-02 | Mostrar dez carteiras por página, ordenadas por nome e id | Cabe no viewport e mantém ordem estável quando nomes se repetem |
| D-03 | Obter `investidorId` do contexto global | Evita expor no formulário um vínculo que o usuário já selecionou |
| D-04 | Carregar todas as páginas de corretoras ativas ao abrir o modal | A API não oferece busca por nome e nenhuma corretora elegível pode ficar oculta |
| D-05 | Tratar mercado e corretora como imutáveis | O contrato do backend só permite renomear a carteira |
| D-06 | Permitir nomes repetidos e quantidade ilimitada de carteiras | É o comportamento definido pelo PRD e aceito pelo backend |
| D-07 | Exigir o nome exato antes de excluir | A exclusão é irreversível para o usuário, conforme o design system |

## Componentes e responsabilidades

- **Página de carteiras:** lê o investidor atual, controla paginação e coordena
  carregamento, vazio, erro e atualização da tabela.
- **Acesso a dados de carteiras:** encapsula listagem, criação, renomeação e
  exclusão, convertendo parâmetros e respostas da API para modelos do domínio.
- **Estado da feature:** usa signals para representar página atual, carregamento,
  erro e mutações em andamento; componentes de apresentação não fazem HTTP.
- **Tabela de carteiras:** renderiza Nome, Corretora, Mercado, Moeda e Ações. A
  primeira coluna fica fixa quando houver overflow horizontal.
- **Modal de criação:** mantém o formulário e o carregamento completo das
  corretoras; não conhece nem permite editar `investidorId`.
- **Modal de renomeação:** edita somente o nome.
- **Modal de exclusão:** explica a exclusão lógica e exige o nome exato.

## Contratos de dados

### Listar carteiras

`GET /carteiras?investidorId={id}&page={n}&size=10&sort=nome,asc&sort=id,asc`

A resposta `Page<CarteiraResponseDTO>` fornece conteúdo, página, total de
elementos e total de páginas. A tela usa apenas carteiras ativas retornadas pelo
backend; não aplica filtro local de investidor.

### Carregar corretoras do formulário

`GET /corretoras?page={n}&size=100&sort=razaoSocial,asc&sort=id,asc`

Ao abrir o modal, a feature busca a primeira página e continua até `last=true`.
Os resultados são deduplicados por `id`. O modal não habilita o envio antes do
fim da sequência. Cada nova abertura refaz a consulta para refletir cadastros ou
exclusões recentes.

### Criar carteira

`POST /carteiras`

```json
{
  "investidorId": 1,
  "corretoraId": 10,
  "mercado": "BR",
  "nome": "Dividendos"
}
```

O nome é aparado antes do envio. A resposta criada entra na página correta após
recarregar a listagem ordenada; BR é exibido em BRL e US em USD.

### Renomear carteira

`PATCH /carteiras/{id}` com `{ "nome": "Novo nome" }`.

O retorno substitui a linha e a listagem é recarregada para respeitar a ordenação.

### Excluir carteira

`DELETE /carteiras/{id}`. O sucesso `204` remove a linha. Se ela era a única da
página e existe uma página anterior, a feature volta uma página e consulta de
novo.

### Tipos mínimos do frontend

- `Mercado = 'BR' | 'US'`.
- `Carteira`: `id`, `investidorId`, `corretoraId`, `nomeCorretora`, `mercado`,
  `moeda`, `nome`, `ativa`.
- `CriarCarteira`: `investidorId`, `corretoraId`, `mercado`, `nome`.
- `RenomearCarteira`: `nome`.

## Fluxos e estados

### Página

1. O contexto entrega o investidor selecionado.
2. A página consulta a primeira página de carteiras.
3. Enquanto aguarda, mostra skeleton de tabela.
4. Sucesso com conteúdo mostra tabela e paginação; sucesso vazio mostra a ação
   para criar a primeira carteira.
5. Erro troca o conteúdo por mensagem acionável e "Tentar novamente".

### Criação

1. Abrir o modal inicia o carregamento paginado das corretoras.
2. Com lista vazia, salvar fica bloqueado e "Cadastrar corretora" navega para a
   feature correspondente.
3. Com lista disponível, nome, corretora e mercado são obrigatórios.
4. Salvar desabilita os controles apenas durante a requisição.
5. Sucesso fecha o modal, recarrega a primeira página e confirma a criação.
6. Falha mantém valores e foco no modal para permitir correção ou nova tentativa.

### Renomeação e exclusão

- Renomear inicia com o nome atual e não expõe os campos imutáveis.
- Excluir exige correspondência exata do nome, preservando maiúsculas, acentos e
  espaços internos. O texto explica que a carteira sairá das listagens e que os
  registros históricos continuarão no backend.
- Cancelar ou fechar um modal nunca dispara mutação.

## Validação e erros

- Nome obrigatório após `trim`, com no máximo 255 caracteres.
- Corretora e mercado obrigatórios na criação.
- Erro de campo aparece junto ao controle e move o foco para o primeiro inválido.
- Erros de API usam a mensagem normalizada pelo interceptor global.
- Falha ao carregar corretoras fica restrita ao modal e oferece nova tentativa.
- Resposta de carteira inexistente ou inativa ao renomear fecha o modal, informa
  a indisponibilidade e recarrega a página.
- Falha ao excluir mantém modal e linha; falha ao criar ou renomear mantém os
  valores digitados.

## Acessibilidade e apresentação

- Modais recebem foco inicial, prendem o foco enquanto abertos, fecham por Escape
  quando não há mutação em andamento e devolvem foco ao acionador.
- Controles têm nome acessível e foco visível; erros são associados aos campos e
  anunciados por região viva.
- A tabela usa cabeçalhos semânticos, menu acionável por teclado e indicação de
  overflow horizontal prevista no design system.
- Mercado e moeda são texto, sem depender de cor. Nenhuma moeda é totalizada com
  a outra.

## Estratégia de testes

- **Página:** contexto correto, query paginada e ordenada, troca de página,
  skeleton exclusivo, vazio e erro com repetição.
- **Criação:** todas as páginas de corretoras, deduplicação, ausência de
  corretora, validações, `trim`, BRL/USD, nomes repetidos e preservação do
  formulário em erro.
- **Renomeação:** somente nome editável, preservação dos demais campos,
  reordenação e carteira indisponível.
- **Exclusão:** confirmação pelo nome, cancelamento sem requisição, sucesso,
  retorno à página anterior e falha sem remoção otimista.
- Cada cenário será ligado ao respectivo critério pelo título
  `@spec:AC-xxx` quando a fase de testes começar.
