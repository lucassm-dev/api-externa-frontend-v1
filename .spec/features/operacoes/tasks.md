# Tasks: Operações

> feature: operacoes

Status: pendente | em-andamento | concluida
(atalho: `onp-spec tarefa operacoes <T-xxx> <status>`)

## T-036 — Contratos e repositórios HTTP de posições e operações [pendente]

- Refs: AC-070, AC-078, AC-085, AC-092
- Arquivos: src/app/domain/models/posicao.model.ts, src/app/domain/models/operacao.model.ts, src/app/domain/ports/operacao-repository.port.ts, src/app/infra/http/operacao-http.repository.ts, src/app/domain/enums/tipo-operacao.enum.ts
- Esforço: medio
- Notas: depende de T-008. As posições vêm como lista pura, sem paginação — é a única listagem do backend que foge do padrão. O histórico exige o identificador do investidor e já chega ordenado do mais recente para o mais antigo. Compra e venda não enviam preço. A exclusão de lançamento é física.

## T-037 — Facade da carteira aberta: localizar e carregar posições [pendente]

- Refs: AC-069, AC-070, AC-075, AC-079, AC-084
- Arquivos: src/app/application/carteira-posicoes.facade.ts
- Esforço: alto
- Notas: depende de T-030 e T-036. Como não existe busca de carteira por identificador, a carteira do endereço é localizada numa página grande da listagem do investidor; não encontrada vira estado próprio, não erro. Depois de comprar ou vender, relê as posições no backend em vez de recalcular na tela.

## T-038 — Tela de posições da carteira [pendente]

- Refs: AC-069, AC-070, AC-071, AC-072, AC-074, AC-075
- Arquivos: src/app/presentation/features/carteira/carteira-page.ts
- Esforço: alto
- Notas: depende de T-010 e T-037. A rentabilidade não realizada é valor na moeda, não percentual. O ticker é o rótulo do papel. Valor indisponível vira travessão, nunca zero nem célula vazia.

## T-039 — Sinalização de cotação defasada nas posições [pendente]

- Refs: AC-073
- Arquivos: src/app/presentation/features/carteira/posicao-cotacao.ts
- Esforço: medio
- Notas: depende de T-011 e T-038. Mesma regra do catálogo de ações: limiar por mercado e, quando todas estão defasadas, um aviso único no cabeçalho do card.

## T-040 — Modal de compra com seletor de papel filtrado pelo mercado [pendente]

- Refs: AC-076, AC-077, AC-078, AC-079, AC-080, AC-081
- Arquivos: src/app/presentation/features/carteira/compra-form.ts
- Esforço: alto
- Notas: depende de T-024 e T-037. O seletor é filtrado pelo mercado da carteira no cliente, para que a regra de mercado incompatível seja impossível de violar na interface em vez de virar recusa depois do envio. Nenhum campo de preço: a cotação do momento é quem manda. Fonte indisponível não registra a compra.

## T-041 — Modal de venda com limite da posição [pendente]

- Refs: AC-082, AC-083, AC-084
- Arquivos: src/app/presentation/features/carteira/venda-form.ts
- Esforço: alto
- Notas: depende de T-037. Vender só aparece em papel que a carteira possui. Quantidade acima da posição é recusada pelo backend com a quantidade disponível na mensagem — exibir como veio. Venda que zera a posição a remove da tela, e o lançamento permanece no histórico.

## T-042 — Facade do histórico de movimentações [pendente]

- Refs: AC-085, AC-089, AC-092, AC-093
- Arquivos: src/app/application/movimentacoes.facade.ts
- Esforço: medio
- Notas: depende de T-005 e T-036. O histórico é sempre global do investidor: o backend não filtra por carteira, papel, tipo ou período, e filtrar no cliente sobre uma única página mentiria sobre o conjunto. Depois de excluir, recarrega a página atual.

## T-043 — Tela do histórico de movimentações [pendente]

- Refs: AC-085, AC-086, AC-087, AC-088, AC-089
- Arquivos: src/app/presentation/features/movimentacoes/movimentacoes-page.ts
- Esforço: medio
- Notas: depende de T-010 e T-042. Compra e venda se distinguem por texto, não só por cor. A tela não oferece filtro que o backend não sustenta e deixa explícito que a lista é de todas as carteiras.

## T-044 — Excluir lançamento com confirmação e recálculo [pendente]

- Refs: AC-090, AC-091, AC-092, AC-093
- Arquivos: src/app/presentation/features/movimentacoes/lancamento-excluir.ts
- Esforço: medio
- Notas: depende de T-010 e T-042. Corrigir é excluir e relançar: não há edição de lançamento, porque o backend não revalida se a nova quantidade deixa a posição negativa. A exclusão apaga de verdade e faz o backend recalcular a posição a partir do histórico restante.
