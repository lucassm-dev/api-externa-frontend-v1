# Design — Frontend MVP do Simulador de Carteira

> Data: 2026-09-02
> Status: **aprovado** — as três seções fechadas com o dono do produto em 02/09/2026
> Insumos: `docs/api/backend-api.md`, `docs/design-system-fef-invest.md`,
> `docs/references/`, specs da tentativa anterior em `onp-worktrees/`,
> `api-externa-frontend-vercel` (Next.js).

## Contexto

Frontend Angular 22 para o backend Spring `api-externa-backend-v1`. Já existe uma tentativa
anterior deste mesmo projeto, com 5 features especificadas em worktrees
(`fundacao`, `corretoras`, `acoes`, `carteiras`, `operacoes`) e implementação parcial. As
specs antigas são boas de forma, mas foram escritas a partir do `openapi.json` e do PRD, não
do código — o levantamento em `docs/api/backend-api.md` responde 7 das 9 perguntas que elas
deixaram em aberto e invalida algumas ACs.

## Decisões

| # | Decisão | Escolha | Por quê |
|---|---|---|---|
| D-01 | O backend pode ser alterado? | **Não — backend congelado** | O frontend contorna tudo e as specs valem sozinhas, sem depender de trabalho no outro repositório |
| D-02 | Escopo do MVP | **7 features**: fundação, investidores, corretoras, ações, carteiras, operações, dashboard | `POST /investidores` existe e hoje só há 1 registro — sem a tela o app depende de seed externo. Dashboard usa as seções 5 e 9 do design system |
| D-03 | Recorte do dashboard | **Consolidado do investidor, BR e US lado a lado** | A AC-023 proíbe somar moedas. Gráfico é compras × vendas do histórico — não há série histórica de cotação no backend |
| D-04 | Design system no Angular | **SCSS + CSS custom properties** | Sem dependência nova; as regras duras do sistema (sem sombra, sem peso 800, espaço múltiplo de 8) ficam grepáveis para o audit |
| D-05 | Investidor de contexto | **localStorage + guard de rota**, revalidado na abertura | Resolve o deep-link: `/carteiras/7` funciona porque o `investidorId` vem do storage e a lista pode ser carregada e filtrada |
| D-06 | Limiar de cotação defasada | **BR 30 min, US 5 min** | Cada limiar sai do atraso da própria fonte, então o âmbar só acende quando o dado está pior que o normal dela |
| D-07 | Movimentações por carteira | **Histórico é só global**; a carteira mostra só posições | `GET /operacoes` é paginado no servidor e não filtra por carteira — filtrar no cliente sobre uma página mentiria |
| D-08 | Corrigir lançamento | **Só excluir, sem editar** | O `PUT` não revalida nada e o cliente não consegue validar; excluir e relançar usa a cotação do momento, que é a RN-Q04 de qualquer jeito |
| D-09 | Rota raiz | **Dashboard** | Antes era carteiras; com o dashboard no escopo ele passa a ser a porta de entrada |
| D-10 | Distinção dos erros da CVM | **Exibir a `message` do backend**, sem classificar | Os dois casos são 422 e só diferem pelo texto — que já está escrito para humano. Evita match de string frágil |
| D-11 | Recorte do dashboard em telas | **Duas rotas**: `/dashboard` (consolidado por moeda) e `/dashboard/aportes` (gráfico) | Revisa o D-03, que juntava as duas coisas. Consolidado custa 1+N requisições; somar o histórico faria quem só quer o saldo pagar por uma consulta que não pediu. Separadas, falha no histórico não alcança os valores do consolidado por estrutura, não por tratamento de erro |
| D-12 | Conversão DTO → model | **Sem camada de mappers**; o repositório normaliza na entrada quando o tipo do fio não serve ao domínio | No backend o mapper existe porque Entity ≠ DTO; aqui o DTO é o formato do fio. Só dois casos divergem (`dataHoraCotacao` string→data, `situacaoCadastral` código→rótulo). O precedente é o `ApiError`, montado do `StandardError` pelo interceptor |

## Perguntas antigas resolvidas pelo código

| ID | Pergunta | Resposta |
|---|---|---|
| Q-001 | Como distinguir "não autorizada" de "não verificável" na CVM? | Os dois são 422; só o texto de `message` difere. Resolvido por D-10 |
| Q-002 | Qual o limiar de "defasada"? | Não vem do backend — decidido em D-06 |
| Q-003 | Cota estourada chega como quê? | 502 com mensagem própria; exceto em `atualizar-cotacao`, que vira 200 silencioso com a cotação velha |
| Q-004 | Excluir carteira com posições é permitido? | Sim, soft-delete. Mas as operações dela continuam no histórico do investidor |
| Q-005 | O resultado realizado será exposto? | Não existe campo nem endpoint |
| Q-006 | Editar quantidade mantém o preço? | Mantém — só sobrescreve o que vier não-`null` |
| Q-007 | Excluir compra que já teve venda? | Permitido, sem validação; o recálculo zera e apaga a posição |
| Q-008 | O contexto persiste entre recarregamentos? | Sim — decidido em D-05 |
| Q-009 | Há investidores seed? | Há 1 (`id: 1`). Assumir seed era escolha, não limitação — D-02 adiciona a tela |

## ACs da tentativa anterior que não se sustentam

- **AC-011** manda a tela mostrar o nome da empresa — `nomeEmpresa` é sempre `null`.
  O ticker passa a ser o rótulo.
- **AC-012** diz 404 para ticker inexistente na fonte — é **422**.
- **AC-019** diz que falha de fonte não derruba a tela — só vale para atualizar cotação;
  no cadastro ela bloqueia com 502.
- **AC-027** fala em "abrir o detalhe da carteira" — não existe `GET /carteiras/{id}`.
- **AC-038** (editar operação) sai de escopo por D-08.
- **ASM-002** assume `situacaoCadastral` como texto livre — vem `"2"`, código da Receita.

---

## Seção 1 — Arquitetura e pastas

> Status: **aprovada**

As camadas seguem `presentation → application → domain ← infra`. A dependência aponta
sempre para dentro.

### Camadas

| Pasta | Conteúdo |
|---|---|
| `domain/` | `models/` (tipos que espelham os DTOs), `enums/`, `ports/` (interfaces de repositório). **Sem imports do Angular** |
| `infra/http/` | Uma implementação por port. Cada uma declara só o caminho do recurso (`/corretoras`); o `apiUrlInterceptor` prefixa |
| `application/` | Facades com signals — `InvestidorContextoStore`, uma por feature, e `CotacaoFrescor` (cálculo de defasagem num lugar só) |
| `presentation/` | `layout/` (shell: sidebar 240px `--brand-900` + topbar branca 64px + seletor de investidor) e `features/` (uma pasta por área, lazy por rota) |
| `core/` | `config/` (`API_BASE_URL`), `http/` (interceptors, `toPageParams`), `guards/investidor-contexto.guard.ts` |
| `shared/` | Componentes, pipes, directives e utilitários reutilizáveis |

Sem mappers: os DTOs viram os models direto. O que precisaria de derivação já vem pronto do
backend (`valorTotal`, `rentabilidadeNaoRealizada`).

Dois casos fogem do 1:1 e são normalizados **no próprio repositório**, na entrada, sem virar
camada: `dataHoraCotacao` chega string e o `CotacaoFrescor` precisa de data, e
`situacaoCadastral` chega como o código numérico da Receita (`"2"`), que nenhuma tela deve
exibir cru. O precedente é o `ApiError`, montado a partir do `StandardError` pelo
interceptor — converter onde as formas divergem, e só aí.

### Regras

- Componente **nunca** injeta `HttpClient` nem repositório de `infra/` — passa por `application/`.
- `application/` depende de `domain/ports`, não da implementação em `infra/`.
- Nada em `domain/` importa de `infra/`, `application/` ou `presentation/`.

### `src/styles/`

```
_tokens.scss        cor, tipografia, espaço, raio — as tabelas do design system
_base.scss          reset, body, foco visível, Plus Jakarta Sans
_tipografia.scss    .text-display … .text-micro + a classe .num com tabular-nums
_controles.scss     botão (3 níveis + --danger), input, select, label
_tabela.scss        linha 48px, header sticky, coluna travada, gradiente de overflow
_card.scss          card, badge, chip
index.scss          agrega; importado por src/styles.scss
```

**O corte entre CSS e componente:** o que é só aparência vira classe (botão, input, card,
badge); o que tem comportamento ou estrutura vira componente em `shared/components/` —
paginador, skeleton de tabela, estado vazio, card de erro, modal de confirmação, badge de
defasagem e o seletor de investidor. Evita 15 componentes de uma linha e mantém o checklist
da seção 11 do design system grepável.

---

## Seção 2 — Telas, rotas e fluxo de dados

> Status: **aprovada**

### Rotas

O guard protege só o que depende de investidor. Catálogos são globais.

```
/                  → redirect /dashboard
/dashboard         [guard]  KPIs por moeda (consolidado)
/dashboard/aportes [guard]  gráfico de compras × vendas
/carteiras         [guard]  lista do investidor
/carteiras/:id     [guard]  posições + comprar/vender
/movimentacoes     [guard]  histórico global do investidor
/acoes                      catálogo
/corretoras                 catálogo
/investidores               lista, cadastro e escolha do contexto
**                 → não encontrado
```

Sem contexto, o guard redireciona para `/investidores` — onde se escolhe ou cadastra. Assim
quem chega com o app zerado tem saída, em vez de bater num seletor vazio. O seletor da
topbar troca o contexto a qualquer momento e invalida os dados das facades dependentes.

**Deep-link para `/carteiras/7`:** o guard restaura o investidor do localStorage e revalida
contra `GET /investidores`; a rota carrega `GET /carteiras?investidorId=X&size=100` e
procura o id na lista. Não achou (carteira de outro investidor, ou excluída) → estado
"carteira não encontrada" com link para a lista.

A revalidação usa a **lista**, não `GET /investidores/{id}`: a busca por id não filtra
`ativo` e devolve 200 para investidor já excluído, então validar por ela deixaria o app
preso num contexto morto. A listagem só traz ativos e é a mesma chamada que alimenta o
seletor da topbar — uma requisição serve aos dois.

### Endpoints por tela

| Tela | Ao entrar | Ao agir |
|---|---|---|
| Dashboard | carteiras + posições de cada uma | — |
| Aportes | `GET /operacoes?investidorId` | — |
| Carteiras | `GET /carteiras?investidorId` paginado | criar (carrega corretoras para o select), renomear, excluir |
| Carteira | carteiras `size=100` para localizar + `GET /{id}/posicoes` | comprar / vender |
| Movimentações | `GET /operacoes?investidorId` paginado | excluir lançamento |
| Ações | `GET /acoes` paginado | cadastrar, atualizar cotação, excluir, buscar por ticker |
| Corretoras | `GET /corretoras` paginado | cadastrar por CNPJ, buscar por CNPJ, excluir |
| Investidores | `GET /investidores` paginado | cadastrar, excluir, selecionar como contexto |

### Os dois pontos caros

**O consolidado custa 1 + N requisições** (carteiras, uma de posições por carteira); o
gráfico saiu para `/dashboard/aportes` e custa uma consulta, paga só por quem abre aquela
tela (D-11). Carrega progressivo: cada bloco — BR, US — tem skeleton próprio e preenche
quando seus dados chegam. Se as posições de uma carteira falharem, aquele bloco de moeda
mostra erro parcial e informa quantas carteiras entraram na conta, em vez de derrubar a
tela ou exibir um total incompleto como se fosse completo.

**Cadastro de corretora é um POST só, porém lento** — o backend encadeia Receita, CVM e
ViaCEP em série. O botão vira "consultando Receita e CVM…" e trava o formulário. Sem timeout
do lado do cliente: quem decide desistir é o backend, com 502.

### Estado

`InvestidorContextoStore` é o único estado global. As facades de feature guardam
`dados` / `carregando` / `erro` e **recarregam a cada entrada na rota** — sem cache entre
navegações, porque o volume é pequeno e cotação envelhece.

Nunca guardado, sempre recalculado na tela: total por moeda, rentabilidade em percentual e
a defasagem da cotação.

### Escrita

Depois do 201 de compra ou venda a tela **relê** as posições, em vez de atualizar
localmente — o preço unitário e o preço médio saem do servidor, e a posição é recalculada
lá. Mesma coisa ao excluir um lançamento: recarrega a página atual do histórico.

Comprar e vender são **modal de formulário**, abertos da tela da carteira: só ticker e
quantidade. O select de ticker é filtrado pelo mercado da carteira no cliente, para a
RN-P01 ser impossível de violar na interface em vez de virar 422 depois do envio.

Isso não conflita com a seção 7 do design system, que classifica vender como "secundário,
**sem modal**": o que ela proíbe é o modal de **confirmação** em cima de uma ação
reversível e frequente. O formulário de venda é o modal onde a ação é composta, não uma
pergunta "tem certeza?" antes de executá-la. Confirmação continua existindo só onde a ação
é irreversível — excluir lançamento, excluir carteira.

---

## Seção 3 — Erros, estados e testes

> Status: **aprovada**

### Erro para tela

O `httpErrorInterceptor` já entrega tudo como `ApiError`. O que cada status vira:

| Status | Tratamento |
|---|---|
| 400 com `fieldErrors` | erro por campo, chave = `field`, direto no formulário |
| 400 sem `message` | corpo default do Spring (parâmetro faltando, id não numérico). Mensagem de fallback nossa, nunca texto técnico cru |
| 404 | estado vazio da tela ou volta para a lista — não é card de erro |
| 409 | erro no campo que colidiu; a `message` nomeia qual (e-mail, CPF, CNPJ, ticker) |
| 422 | exibe a `message` do backend como veio — já está escrita para humano |
| 502 | card de erro com "Tentar de novo"; a copy deixa claro que a falha é da fonte externa |

### Estados

Toda tela de dado tem os três estados da seção 8 do design system: **skeleton** com a
dimensão exata do conteúdo real, **vazio** com copy dizendo o que fazer ("Adicione seu
primeiro ativo", não "Nenhum ativo encontrado") e **erro** em card com borda `--down`.

Quatro casos existem por causa deste backend em específico:

1. **Cotação defasada** — badge âmbar acima do limiar (BR 30 min, US 5 min). Se todas
   estiverem defasadas, um badge único no cabeçalho do card e as células limpas.
2. **Atualizar cotação que "funciona" sem atualizar** — o endpoint devolve 200 com o dado
   velho quando a fonte cai. A tela compara `dataHoraCotacao` antes e depois; se não mudou,
   avisa "não foi possível atualizar agora", sem tratar como erro de tela.
3. **`nomeEmpresa` null** — o ticker é o rótulo. Nunca exibir travessão no lugar de um nome
   que nunca vai existir.
4. **Valor zerado ou indisponível** — travessão, nunca `0,00` nem célula vazia.

### Testes

A constituição exige prova executável para todo requisito (P-001). Cada AC vira um teste
anotado `@spec:AC-xxx` em `*.spec.ts`, rodado por `npm run test:tap`, cuja saída TAP o
`onp-spec verify` lê. Três camadas conforme o tipo de AC:

- regra de exibição ou formatação → teste de componente
- regra de chamada ao backend (ex.: nunca disparar `/carteiras` sem `investidorId`) →
  teste de facade com `provideHttpClientTesting`
- navegação e guard → teste de rota

Sem e2e no MVP.

### Correções na constituição

`.spec/constituicao.md` está com o preset base intacto e precisa de dois ajustes:

- **P-002** verifica segredos com o glob `src/**/*.js` num projeto TypeScript — verificação
  morta, cai em `GLOB_SEM_ARQUIVOS`. Passa para `src/**/*.ts`.
- **Princípio novo** para as regras duras do design system, que são exatamente do tipo que o
  motor checa por regex: sem sombra fora das duas exceções nomeadas, sem peso 800, sem
  ALL CAPS.

---

## Próximos artefatos

Ainda não escritos — dependem do aval sobre este documento:

```
.spec/features/fundacao/spec.md
.spec/features/investidores/spec.md
.spec/features/corretoras/spec.md
.spec/features/acoes/spec.md
.spec/features/carteiras/spec.md
.spec/features/operacoes/spec.md
.spec/features/dashboard/spec.md
.spec/constituicao.md          (corrigir P-002, adicionar o princípio de design)
src/styles/*.scss              (7 arquivos — tokens e classes)
```

IDs `US-` / `AC-` / `ASM-` / `Q-` são globais e contínuos entre as 7 specs, recomeçando do
001 — o escopo mudou o bastante para que reaproveitar a numeração antiga só confundisse.

## Suposições deste design

| ID | Suposição | Status |
|---|---|---|
| ASM-D01 | Nenhum investidor tem mais de 100 carteiras, então `size=100` basta para localizar uma carteira por id no cliente | aberta |
| ASM-D02 | O volume de operações por investidor cabe na paginação padrão sem necessidade de filtro server-side | aberta |
| ASM-D03 | O backend continua sem autenticação durante todo o MVP do frontend | confirmada (D-01) |
| ASM-D04 | Plus Jakarta Sans entrega `tabular-nums`; se não entregar, a classe `.num` cai para Inter apenas nas células numéricas (regra 6 da seção 2 do design system) | aberta |
