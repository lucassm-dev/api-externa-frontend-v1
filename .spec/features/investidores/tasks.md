# Tasks: Investidores

> feature: investidores

Status: pendente | em-andamento | concluida
(atalho: `onp-spec tarefa investidores <T-xxx> <status>`)

## T-012 — Contrato e repositório HTTP de investidores [concluida]
- Refs: AC-016, AC-020, AC-023
- Arquivos: src/app/domain/models/investidor.model.ts, src/app/domain/ports/investidor-repository.port.ts, src/app/infra/http/investidor-http.repository.ts
- Esforço: baixo
- Notas: depende de T-008. O CPF entra no cadastro e nunca volta na resposta — o modelo de leitura não tem esse campo. Não existe endpoint de edição. A exclusão é lógica.

## T-013 — Facade de investidores [concluida]
- Refs: AC-016, AC-020, AC-021, AC-023
- Arquivos: src/app/application/investidores.facade.ts
- Esforço: medio
- Notas: depende de T-012. Guarda dados, carregando e erro em signals e recarrega a cada entrada na rota. É também a fonte da listagem que o store de contexto usa para revalidar.

## T-014 — Listagem de investidores com paginação, vazio e escolha de contexto [concluida]
- Refs: AC-020, AC-021, AC-022
- Arquivos: src/app/presentation/features/investidores/investidores-page.ts
- Esforço: medio
- Notas: depende de T-010 e T-013. Escolher um investidor da lista define o contexto global de T-005.

## T-015 — Formulário de cadastro de investidor [pendente]

- Refs: AC-016, AC-017, AC-018, AC-019
- Arquivos: src/app/presentation/features/investidores/investidor-form.ts
- Esforço: alto
- Notas: depende de T-009 e T-013. Erros de validação chegam por campo; e-mail e CPF já cadastrados chegam como conflito, e a mensagem do backend nomeia qual dos dois colidiu.

## T-016 — Exclusão de investidor com confirmação [pendente]

- Refs: AC-023
- Arquivos: src/app/presentation/features/investidores/investidor-excluir.ts
- Esforço: baixo
- Notas: depende de T-010 e T-013. Exclusão lógica: some da listagem, mas continua acessível por identificador no backend. Excluir o investidor de contexto precisa limpar o contexto.
