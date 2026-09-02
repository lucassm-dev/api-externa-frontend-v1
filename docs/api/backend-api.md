# API do backend — referência

Levantado do código-fonte de `api-externa-backend-v1` (Spring Boot 3.3 / Java 21) e
conferido contra a API rodando em `localhost:8080` em 01/09/2026.

Base no frontend: `/api` (proxy do dev server → `localhost:8080`).
Swagger do backend: http://localhost:8080/swagger-ui.html

## Convenções

**Paginação.** Toda listagem devolve o `Page<T>` do Spring: `content`, `totalElements`,
`totalPages`, `number`, `size`, `first`, `last`, `numberOfElements`, `empty`.
Parâmetros: `page` (base 0), `size` (default **20**), `sort` (ex.: `nome,asc`, repetível).
Única exceção: `GET /carteiras/{id}/posicoes` devolve array puro, sem paginação.

**Erro.** Exceções tratadas seguem o `StandardError`:
`{ timestamp, status, error, message, path, fieldErrors? }`.
`fieldErrors` é `[{ field, message }]` e só aparece em 400 de validação.

**Exclusão é lógica.** Investidor, Corretora, Ação e Carteira usam `DELETE` apenas para
marcar `ativo = false`. Só `DELETE /operacoes/{id}` apaga de verdade.

**Enums.** `Mercado`: `BR` | `US` (define moeda e fonte de cotação).
`TipoOperacao`: `COMPRA` | `VENDA`.

## Endpoints

### Investidores

| Método | Caminho | Notas |
|---|---|---|
| POST | `/investidores` | Corpo `{ nome, email, cpf }`; CPF com 11 dígitos numéricos. 201 + `Location`. Erros: 400 validação, 409 e-mail ou CPF em uso |
| GET | `/investidores` | `Page<{ id, nome, email }>`, só ativos |
| GET | `/investidores/{id}` | 200 / 404. **Não filtra `ativo`** |
| DELETE | `/investidores/{id}` | 204 / 404. Exclusão lógica |

O CPF entra no cadastro mas **nunca sai** na resposta. Não há endpoint de edição.

### Corretoras

| Método | Caminho | Notas |
|---|---|---|
| POST | `/corretoras` | Corpo `{ cnpj }` — só isso. 201 com 17 campos preenchidos por fontes externas |
| GET | `/corretoras` | `Page<CorretoraResponse>`, só ativas |
| GET | `/corretoras/{id}` | 200 / 404. Não filtra `ativo` |
| GET | `/corretoras/cnpj/{cnpj}` | 200 / 404. Normaliza a pontuação |
| DELETE | `/corretoras/{id}` | 204 / 404. Exclusão lógica |

Pipeline do POST, em ordem: normaliza e valida os dígitos verificadores → checa duplicidade
(409) → BrasilAPI/CNPJ para dados cadastrais → BrasilAPI/CVM para autorização → ViaCEP para
endereço (com fallback para o endereço do CNPJ).

Só é aceita corretora com situação `EM FUNCIONAMENTO NORMAL` na CVM. **Não autorizada** e
**não verificável** são casos distintos, ambos 422, diferenciados só pelo texto de `message`:

- `"Corretora não autorizada na CVM: situação = …"`
- `"Não foi possível verificar a autorização na CVM: …"`

Campos de contato e endereço voltam `null` com frequência. `situacaoCadastral` vem como o
código numérico da Receita (`"2"`), não como texto.

### Ações

| Método | Caminho | Notas |
|---|---|---|
| POST | `/acoes` | Corpo `{ ticker, mercado }`. Busca a cotação no ato. 409 duplicado, 422 ticker fora da fonte, 502 fonte indisponível |
| GET | `/acoes` | `Page<AcaoResponse>`, só ativas |
| GET | `/acoes/ticker/{ticker}` | 200 / 404. Case-insensitive. Não filtra `ativo` |
| PUT | `/acoes/{id}/atualizar-cotacao` | 200 sempre que a ação existir |
| DELETE | `/acoes/{ticker}` | 204 / 404. Chave é o **ticker**, não o id |

`atualizar-cotacao` **não devolve erro** quando a fonte cai: responde 200 com a última
cotação conhecida. Para saber se atualizou de fato, comparar `dataHoraCotacao`.

`nomeEmpresa` vem **sempre `null`** — o `AcaoService` nunca preenche o campo. Propaga para
as posições da carteira.

### Carteiras

| Método | Caminho | Notas |
|---|---|---|
| POST | `/carteiras` | Corpo `{ investidorId, corretoraId, mercado, nome }`. 404 se investidor ou corretora não existir |
| GET | `/carteiras?investidorId=` | Parâmetro **obrigatório**. `Page<CarteiraResponse>`, só ativas |
| PATCH | `/carteiras/{id}` | Corpo `{ nome }`. Renomear é a única edição possível |
| DELETE | `/carteiras/{id}` | 204 / 404. Exclusão lógica |
| GET | `/carteiras/{id}/posicoes` | `CarteiraAcaoResponse[]`, sem paginação. `[]` também para carteira inexistente |

A moeda é derivada do mercado, não enviada. Mercado e corretora não mudam após a criação.

`rentabilidadeNaoRealizada` é **valor absoluto na moeda**, não percentual:
`(cotacaoAtual − precoMedio) × quantidade`. Usa a última cotação **salva** na ação, que
pode estar velha — por isso `dataHoraCotacao` acompanha o número.

**Não existe `GET /carteiras/{id}`.**

### Operações

| Método | Caminho | Notas |
|---|---|---|
| POST | `/operacoes/compra` | Corpo `{ carteiraId, ticker, quantidade }`. **Preço não é enviado** |
| POST | `/operacoes/venda` | Mesmo corpo. Exige posição existente e quantidade ≤ posição |
| GET | `/operacoes?investidorId=` | Parâmetro obrigatório. Ordenado por `dataHora` DESC na própria query |
| PUT | `/operacoes/{id}` | Corpo `{ quantidade?, precoUnitario? }`. O que vier `null` é ignorado |
| DELETE | `/operacoes/{id}` | 204 / 404. Exclusão física + recálculo |

Erros de compra/venda: 404 carteira inativa ou ação não cadastrada; 422 mercado
incompatível, ticker fora da fonte, `"Sem posição em X nesta carteira"`,
`"Quantidade excede a posição atual (N unidades)"`; 502 fonte indisponível.

`PUT` **não revalida** se a nova quantidade deixa a posição negativa.

`GET /operacoes` não aceita filtro por carteira, ticker, tipo ou período.

## Regras de negócio aplicadas

| Regra | O que o backend garante |
|---|---|
| RN-P01 | Carteira e ação precisam ser do mesmo mercado |
| RN-P02 | Compras sucessivas geram preço médio ponderado |
| RN-P03 | Não se vende mais do que a posição atual |
| RN-P04 | Venda que zera a posição a remove; as operações ficam |
| RN-P05 | Rentabilidade = `(cotação − preço médio) × quantidade` |
| RN-P07 | Cada operação gera exatamente uma movimentação |
| RN-Q01 | Toda cotação vem acompanhada do horário em que foi obtida |
| RN-Q04 | Compra e venda usam a cotação do momento, nunca preço digitado |
| RN-Q05 | Fonte indisponível tem mensagem própria; atualizar cotação cai para a última conhecida |

**A posição é derivada, não escrita.** Todo insert, update ou delete de operação faz o
`PosicaoService` reler o histórico completo daquele par carteira/ação e recalcular
quantidade e preço médio do zero. A operação é a fonte da verdade.

## Erros

| Status | `error` | Quando |
|---|---|---|
| 400 | Dados inválidos | Bean Validation reprovou o corpo — vem com `fieldErrors` |
| 404 | Recurso não encontrado | id/ticker/CNPJ inexistente, carteira inativa |
| 409 | Recurso duplicado | e-mail, CPF, CNPJ ou ticker repetido |
| 422 | Regra de negócio violada | mercado incompatível, venda acima da posição, CVM reprovada |
| 502 | Serviço externo indisponível | fonte externa fora do ar ou cota estourada |

**Erros não mapeados escapam do padrão.** Parâmetro obrigatório faltando, id não numérico e
rota inexistente devolvem o corpo default do Spring — `{ timestamp, status, error, path }`,
**sem o campo `message`**. O interceptor precisa de fallback para esse formato.

## APIs externas

| Fonte | Usada em | Limite gratuito | Defasagem |
|---|---|---|---|
| BrasilAPI / CNPJ | cadastro de corretora | sem chave | — |
| BrasilAPI / CVM | autorização da corretora | sem chave | base do último dia útil |
| ViaCEP | endereço da corretora | sem chave | — |
| brapi.dev | cotação `BR` | 15.000 req/mês | ~30 min |
| Twelve Data | cotação `US` | 800 créditos/dia · 8/min | 0,3 a 2 min |

Nenhum preço é ao vivo. Os limites são compartilhados por todos os usuários da aplicação,
já que as chamadas saem do backend — o que desaconselha botões de "atualizar tudo".

## Lacunas conhecidas

1. **Sem autenticação.** Nenhum Spring Security, login ou token. `investidorId` é escolhido
   pelo cliente. A spec `autenticacao-investidor` existe no backend sem implementação.
2. **Sem CORS.** Nenhum `@CrossOrigin` nem `WebMvcConfigurer` — o browser não chama
   `localhost:8080` direto.
3. **Sem `GET /carteiras/{id}`.** Abrir uma carteira exige listar por investidor e filtrar.
4. **Sem agregados.** Nenhum endpoint de valor investido, valor atual ou alocação.
5. **Sem saldo em dinheiro.** Compra não checa caixa (RN-P06 fora do MVP).
6. **Sem busca ou filtro** em qualquer listagem.
7. **Exclusão lógica vaza nas buscas por id** — recursos excluídos continuam acessíveis por
   `GET /{id}` e `/ticker/{ticker}`, e a resposta não indica isso (só carteira expõe `ativa`).
