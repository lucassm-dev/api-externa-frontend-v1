# FEF Invest — Design System

Documento de regras de interface. Toda tela do sistema segue isto. Quando houver dúvida entre este documento e uma referência visual, este documento vence.

**Identidade:** SaaS financeiro claro, com sidebar escura teal. Denso na tabela, arejado no resto. Sistema flat — sem sombras, exceto as duas exceções nomeadas no fim.

---

## 1. Cor

### Tokens

| Token | Hex | Uso |
|---|---|---|
| `--brand-600` | `#0F9E7A` | botão primário, link, item ativo, foco |
| `--brand-700` | `#0B7A5E` | hover do primário |
| `--brand-900` | `#08281F` | fundo da sidebar |
| `--brand-100` | `#D6F2E9` | fundo de badge/chip de marca |
| `--up` | `#16A34A` | alta, lucro, compra |
| `--up-bg` | `#DCFCE7` | fundo de badge de alta |
| `--down` | `#DC2626` | baixa, prejuízo, venda, ação destrutiva |
| `--down-bg` | `#FEE2E2` | fundo de badge de baixa |
| `--warn` | `#D97706` | cotação defasada, cota de API |
| `--warn-bg` | `#FEF3C7` | fundo do badge âmbar |
| `--warn-text` | `#92400E` | texto sobre `--warn-bg` |
| `--bg` | `#F1F3F5` | fundo da página |
| `--surface` | `#FFFFFF` | card, tabela, topbar |
| `--surface-hover` | `#F9FAFB` | hover de linha |
| `--border` | `#E5E7EB` | borda padrão (hairline) |
| `--border-strong` | `#D1D5DB` | borda de input, dropdown, overlay |
| `--text` | `#111827` | texto principal |
| `--text-muted` | `#6B7280` | texto secundário, cabeçalho de coluna |
| `--text-disabled` | `#9CA3AF` | desabilitado, ícone de estado vazio |
| `--sidebar-text` | `#9DBFB4` | item inativo da sidebar |

### Regras de cor

1. **Teal só em elemento interativo.** Botão, link, item ativo do menu, foco de input, sidebar. Nunca dentro de célula de tabela, nunca em número.
2. **Verde e vermelho são reservados para variação.** Só significam alta e baixa. Nunca são cor de marca, nunca são decoração.
3. **Teal e verde precisam ser distinguíveis.** `#0F9E7A` é azulado, `#16A34A` é amarelado. Nunca aproxime os dois matizes.
4. **Cor nunca é a única informação.** Todo número de variação carrega seta `↑` ou `↓` junto. Resolve daltonismo sem esforço extra.
5. **Vermelho preenchido = perigo. Vermelho como texto = queda.** Na tabela o vermelho é sempre texto puro sobre fundo branco. Em ação destrutiva é sempre superfície preenchida com texto branco. A distinção é forma, não cor.
6. **Âmbar é exclusivo de estado degradado.** Cotação atrasada, cota de API estourada, dado parcial. Nunca é destaque nem decoração.

---

## 2. Tipografia

**Família:** Plus Jakarta Sans.
**Fallback:** `"Plus Jakarta Sans", system-ui, -apple-system, sans-serif`.

### Escala

| Token | px / line-height | Peso | Uso |
|---|---|---|---|
| `text-display` | 28 / 1.2 | 700 | valor de KPI (`R$ 1.027,05`) |
| `text-h1` | 22 / 1.3 | 700 | título de página |
| `text-h2` | 16 / 1.4 | 600 | título de card |
| `text-body` | 14 / 1.5 | 400 | célula de tabela, texto corrido |
| `text-label` | 13 / 1.4 | 500 | label de formulário, texto de botão |
| `text-caption` | 12 / 1.4 | 500 | cabeçalho de coluna, badge |
| `text-micro` | 11 / 1.3 | 500 | legenda de gráfico |

### Regras de tipografia

1. **Três pesos apenas:** 400, 500, 700. Peso 600 é permitido só em `text-h2`. Nada de 800.
2. **Hierarquia sai de tamanho e cor**, não de peso. Se dois elementos precisam se diferenciar, mude o tamanho ou aplique `--text-muted`.
3. **Sentence case sempre.** Nunca ALL CAPS, nem em cabeçalho de coluna, nem em badge.
4. **Todo número usa `font-variant-numeric: tabular-nums`.** Sem isso as vírgulas decimais não alinham na vertical e a coluna deixa de ser comparável de relance.
5. **Célula numérica recebe `letter-spacing: -0.01em`.** Plus Jakarta Sans é larga; sem isso a tabela estoura na horizontal.
6. **Verificação obrigatória antes de fechar a fonte:** empilhe `1.111,11` e `9.999,99` com `tabular-nums` aplicado. Se as vírgulas não alinharem, a fonte não entregou a feature — crie a classe `.num` com `font-family: "Inter", "Plus Jakarta Sans"` e aplique só nas células numéricas. Não troque a fonte do sistema inteiro.

### Formatação de número

- Moeda BR: `R$ 1.027,05` — ponto de milhar, vírgula decimal, sempre 2 casas.
- Moeda US: `$1,027.05` — na carteira americana, formato local.
- Percentual: sempre 2 casas e sempre com sinal implícito na seta: `↑ 4,53%`, `↓ 2,21%`.
- Quantidade de ação: inteiro sem casa decimal (regra do PRD — sem fração).
- Valor zerado ou indisponível: `—` (travessão), nunca `0,00` nem célula vazia.

---

## 3. Espaço

| Token | px | Uso |
|---|---|---|
| `space-0.5` | 4 | interno de badge, gap ícone↔texto |
| `space-1` | 8 | gap entre elementos irmãos |
| `space-2` | 16 | padding interno de card, padding de célula |
| `space-3` | 24 | padding de card grande, gap entre cards, padding da página |
| `space-4` | 32 | gap entre seções |
| `space-6` | 48 | margem de topo de página, padding de estado vazio |

**Regra:** `4px` existe apenas dentro de componente. Layout — grid, gap entre cards, margem de seção — é sempre múltiplo de 8.

---

## 4. Forma e borda

| Token | Valor |
|---|---|
| `radius-card` | 10px |
| `radius-control` | 8px (botão, input, select) |
| `radius-badge` | 6px |
| `radius-pill` | 999px (chip de filtro removível) |
| `border` | `1px solid #E5E7EB` |
| `border-strong` | `1px solid #D1D5DB` |
| sombra | **nenhuma** |

### Regras

1. **Raio aninhado:** raio interno = raio externo − padding. Card de 10px com padding 16 → elemento colado na borda interna usa 8px. Nunca o mesmo raio dentro e fora.
2. **Elemento flutuante ganha borda mais escura, não sombra.** Dropdown, popover, modal e menu usam `border-strong`.
3. **Header sticky de tabela** separa-se com `border-bottom`, não sombra.

---

## 5. Layout e navegação

### Shell

| Elemento | Valor |
|---|---|
| sidebar | 240px, fundo `--brand-900`, fixa à esquerda |
| sidebar colapsada | 64px, só ícone |
| item ativo | fundo `--brand-600`, texto `#FFFFFF`, raio 8px, padding `0 12px`, altura 40px |
| item inativo | texto `--sidebar-text`; hover `rgba(255,255,255,.06)` |
| topbar | 64px, fundo `--surface`, `border-bottom: 1px solid --border` |
| conteúdo | máx. 1440px (fora a sidebar), centralizado, padding `24px` |
| fundo da página | `--bg` |

A sidebar é o único elemento escuro do sistema. A topbar é branca. Não escureça os dois — a moldura em L sufoca o conteúdo.

### Breakpoints

`sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`

Abaixo de `lg` a sidebar vira drawer sobreposto, acionado por botão na topbar.

### Grid de cards

- KPIs no topo: 4 colunas em `xl`, 2 em `md`, 1 em `sm`.
- Gap entre cards: `space-3` (24px).

---

## 6. Tabela

| Propriedade | Valor |
|---|---|
| altura da linha | 48px |
| padding da célula | `0 16px` |
| separador | `border-bottom: 1px solid --border` |
| cabeçalho | `text-caption`, cor `--text-muted`, sentence case |
| header sticky | fundo `--surface`, `border-bottom: 1px solid --border`, `z-index: 1` |
| hover da linha | fundo `--surface-hover` |
| zebra | desligada |

### Alinhamento

- Texto à esquerda.
- **Número sempre à direita** — é o que faz a vírgula decimal alinhar na vertical.
- Ícone e coluna de ação centralizados.

### Coluna travada (`position: sticky; left: 0`)

Três condições obrigatórias, na ordem em que costumam quebrar:

1. **Fundo opaco na célula, não na linha.** `background: var(--surface)` no `<td>`. Célula sticky transparente deixa as outras colunas passarem por baixo.
2. **Hover explícito.** Como a célula tem fundo próprio, `tr:hover` não a alcança. É preciso `tr:hover td.sticky { background: var(--surface-hover); }`.
3. **Separação por borda.** `border-right: 1px solid var(--border)` na célula travada. Sem sombra no sistema, é a borda que comunica que a coluna está por cima.

`z-index`: 2 na célula sticky, 3 na interseção dela com o header sticky.

### Overflow horizontal

Quando a tabela extrapola a largura, aplicar gradiente de 24px na borda direita (`linear-gradient(to right, transparent, var(--surface))`) como affordance de scroll. Sem isso o usuário não sabe que há mais coluna.

---

## 7. Botões e controles

### Níveis

São **três**: primário, secundário, ghost. Destrutivo não é um quarto nível — é o modificador `--danger` aplicável a qualquer um deles.

| | Fundo | Texto | Borda |
|---|---|---|---|
| primário | `--brand-600` | `#FFFFFF` | nenhuma |
| primário :hover | `--brand-700` | `#FFFFFF` | nenhuma |
| secundário | `--surface` | `--text` | `1px --border-strong` |
| ghost | transparente | `--brand-600` | nenhuma |
| `--danger` primário | `--down` | `#FFFFFF` | nenhuma |
| `--danger` ghost | transparente | `--down` | nenhuma |

### Dimensões

Altura `40px`, padding `0 16px`, raio `8px`, texto `text-label`. Ícone à esquerda, 16px, gap 8px.

### Input

Mesma altura e raio do botão. Borda `--border-strong`. Foco: `border-color: --brand-600` + `box-shadow: 0 0 0 3px rgba(15,158,122,.15)`.

### Ação destrutiva

O critério é **reversibilidade**, não sensação de gravidade.

| Ação | Reversível | Tratamento |
|---|---|---|
| Vender ativo | sim | secundário, sem modal |
| Editar lançamento | sim | secundário |
| Excluir lançamento | não | `--danger` + modal |
| Excluir carteira | não | `--danger` + modal + digitar o nome |
| Excluir conta | não | `--danger` + modal + digitar o nome |

Vender é operação normal e frequente. Confirmar toda venda gera fadiga, o usuário passa a clicar sem ler, e o vermelho perde força para o que é realmente perigoso.

---

## 8. Estados

### Carregamento — skeleton

| Token | Valor |
|---|---|
| fundo | `--border` |
| raio | 6px |
| animação | `pulse` 1.5s ease-in-out infinite, opacidade `.6 → 1` |
| linhas fantasma | 5, ou o último count conhecido |

**Regra:** o bloco cinza tem a dimensão exata do conteúdo real — mesma altura de linha, mesmo número de colunas, mesma largura. Skeleton menor que o conteúdo faz a página pular quando o dado chega, e o usuário perde a linha que estava lendo. Sem shimmer diagonal.

### Cotação defasada — badge âmbar

`background: --warn-bg`, texto `--warn-text`, 11px/500, raio 6px, padding `2px 6px`, texto `atrasado`. Colado à direita do valor, gap 8px.

**Regra de escala:** se todos os ativos estiverem defasados (cota de API estourada), um badge único no cabeçalho do card e as células ficam limpas. Badge por linha só quando a defasagem é do ativo específico. A pergunta é: a exceção é da linha ou da requisição inteira?

### Estado vazio

Ícone 40px `--text-disabled` → título `text-h2` → subtítulo `text-body` em `--text-muted` → botão primário. Centralizado, padding vertical 48px.

Copy diz o que fazer, não o que falta: "Adicione seu primeiro ativo", não "Nenhum ativo encontrado".

### Erro

Card com `border: 1px solid --down`, ícone e título em `--down`, mensagem em `--text`, botão secundário "Tentar de novo". A mensagem diz o que aconteceu e o que fazer. Não pede desculpa, não é vaga.

---

## 9. Gráficos

| Propriedade | Valor |
|---|---|
| série principal | `--brand-600`, linha 2px, sem preenchimento |
| grid | só linhas horizontais, `--border`, 1px |
| eixos | sem linha de eixo; rótulos em `text-micro`, `--text-muted` |
| ponto | oculto; aparece só no hover |
| tooltip | `--surface`, `border: 1px --border-strong`, raio 8px, padding 12px |

### Regras

1. **Teal é permitido como série** — é a exceção documentada à regra 1 da seção Cor. Uma linha de gráfico não pode ser confundida com controle.
2. **Exceto quando o gráfico compara alta e baixa.** Em consolidação de compras × vendas, as séries são `--up` e `--down`. Nunca teal ali, senão a barra teal é lida como clicável.
3. **Máximo de 4 séries por gráfico.** Acima disso, quebrar em dois gráficos.
4. Sem gradiente, sem área preenchida, sem sombra sob a linha.

---

## 10. Exceções ao sistema flat

O sistema não tem sombra. Existem exatamente duas exceções, e ambas são funcionais:

1. **Anel de foco** — `box-shadow: 0 0 0 3px rgba(15,158,122,.15)` em input e botão focado. Existe por acessibilidade de teclado.
2. **Gradiente de overflow** — 24px na borda direita da tabela com scroll horizontal. Existe como affordance.

Qualquer outra sombra ou gradiente é violação do sistema.

---

## 11. Checklist de revisão de tela

Antes de considerar uma tela pronta:

- [ ] Todo número está à direita e com `tabular-nums`
- [ ] Toda variação tem seta além da cor
- [ ] Nenhum teal aparece dentro de célula de dado
- [ ] Nenhuma sombra fora das duas exceções
- [ ] Todo espaçamento de layout é múltiplo de 8
- [ ] Nenhum peso 800; 600 só em `text-h2`
- [ ] Estados de skeleton, vazio e erro estão implementados
- [ ] Foco de teclado visível em todo controle
- [ ] Tabela com coluna travada tem fundo opaco, hover explícito e borda direita
- [ ] Copy em sentence case, voz ativa, dizendo o que fazer
