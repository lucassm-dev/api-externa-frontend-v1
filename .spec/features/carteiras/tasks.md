# Tasks: Carteiras

> feature: carteiras

Status: pendente | em-andamento | concluida
(atalho: `onp-spec tarefa carteiras <T-xxx> <status>`)

## T-030 — Contrato e repositório HTTP de carteiras [pendente]

- Refs: AC-049, AC-054, AC-061, AC-065
- Arquivos: src/app/domain/models/carteira.model.ts, src/app/domain/ports/carteira-repository.port.ts, src/app/infra/http/carteira-http.repository.ts
- Esforço: baixo
- Notas: depende de T-008. A listagem exige o identificador do investidor — nunca disparar a consulta sem ele. Renomear é a única edição possível; mercado e corretora são imutáveis. Não existe busca de carteira por identificador.

## T-031 — Facade de carteiras [pendente]

- Refs: AC-049, AC-050, AC-053, AC-060, AC-064, AC-067, AC-068
- Arquivos: src/app/application/carteiras.facade.ts
- Esforço: alto
- Notas: depende de T-005 e T-030. Toma o investidor do contexto global. Depois de criar, renomear ou excluir, relê a página atual em vez de alterar a lista localmente; carteira que sumiu entre a listagem e a ação faz a página recarregar.

## T-032 — Listagem de carteiras com paginação, skeleton, vazio e erro [pendente]

- Refs: AC-049, AC-050, AC-051, AC-052, AC-053
- Arquivos: src/app/presentation/features/carteiras/carteiras-page.ts
- Esforço: medio
- Notas: depende de T-010 e T-031. Skeleton com a estrutura da tabela, e nunca skeleton, vazio e erro ao mesmo tempo. Dez por página, ordenadas por nome.

## T-033 — Formulário de nova carteira com seletor de corretoras ativas [pendente]

- Refs: AC-054, AC-055, AC-056, AC-057, AC-058, AC-059, AC-060
- Arquivos: src/app/presentation/features/carteiras/carteira-form.ts
- Esforço: alto
- Notas: depende de T-018 e T-031. O seletor carrega todas as páginas de corretoras ativas antes de liberar o salvamento. Sem nenhuma corretora ativa, o formulário fica bloqueado e oferece o caminho para cadastrar uma. O investidor vem do contexto e não aparece no formulário; a moeda é derivada do mercado.

## T-034 — Renomear carteira [pendente]

- Refs: AC-061, AC-062, AC-063, AC-064
- Arquivos: src/app/presentation/features/carteiras/carteira-renomear.ts
- Esforço: medio
- Notas: depende de T-031. Só o campo nome, com as mesmas regras da criação. Carteira já excluída fecha o modal, recarrega a página e avisa que ela não está mais disponível.

## T-035 — Excluir carteira com confirmação por nome [pendente]

- Refs: AC-065, AC-066, AC-067, AC-068
- Arquivos: src/app/presentation/features/carteiras/carteira-excluir.ts
- Esforço: medio
- Notas: depende de T-010 e T-031. O botão destrutivo só habilita quando o nome é digitado exatamente. A exclusão é lógica: o histórico de operações da carteira continua no backend. Removida a última linha da página, carrega a página anterior válida.
