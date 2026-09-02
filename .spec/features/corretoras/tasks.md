# Tasks: Corretoras

> feature: corretoras

Status: pendente | em-andamento | concluida
(atalho: `onp-spec tarefa corretoras <T-xxx> <status>`)

## T-017 — Contrato e repositório HTTP de corretoras [pendente]

- Refs: AC-025, AC-030, AC-033, AC-035
- Arquivos: src/app/domain/models/corretora.model.ts, src/app/domain/ports/corretora-repository.port.ts, src/app/infra/http/corretora-http.repository.ts
- Esforço: baixo
- Notas: depende de T-008. O cadastro envia só o CNPJ e a resposta volta com dezessete campos preenchidos por fontes externas; contato e endereço voltam nulos com frequência, e a situação cadastral vem como código numérico da Receita (`"2"`), não como texto — o repositório traduz o código na entrada, para que nenhuma tela exiba o número cru. Não existe camada de mappers.

## T-018 — Facade de corretoras [pendente]

- Refs: AC-025, AC-030, AC-031, AC-033, AC-035
- Arquivos: src/app/application/corretoras.facade.ts
- Esforço: medio
- Notas: depende de T-017. Além da própria tela, alimenta o seletor de corretoras ativas do formulário de carteira (T-033), que carrega todas as páginas.

## T-019 — Validação de CNPJ no cliente [pendente]

- Refs: AC-024
- Arquivos: src/app/shared/utils/cnpj.ts
- Esforço: baixo
- Notas: normaliza a pontuação e confere os dígitos verificadores antes de qualquer requisição — CNPJ malformado nunca chega a disparar as consultas externas.

## T-020 — Cadastro de corretora por CNPJ [pendente]

- Refs: AC-024, AC-025, AC-026, AC-027, AC-028, AC-029
- Arquivos: src/app/presentation/features/corretoras/corretora-form.ts
- Esforço: alto
- Notas: depende de T-009, T-018 e T-019. Um único envio, porém lento: o backend encadeia Receita, CVM e endereço em série, então o botão vira estado de espera e trava o formulário, sem tempo limite do lado do cliente. Corretora não autorizada e autorização não verificável chegam com o mesmo status e só diferem pelo texto — exibir a mensagem do backend como veio, sem classificar por comparação de texto.

## T-021 — Listagem de corretoras com paginação e campos ausentes [pendente]

- Refs: AC-030, AC-031, AC-032
- Arquivos: src/app/presentation/features/corretoras/corretoras-page.ts
- Esforço: medio
- Notas: depende de T-010 e T-018. Campo que a fonte não devolveu vira travessão, nunca célula vazia.

## T-022 — Busca por CNPJ e exclusão de corretora [pendente]

- Refs: AC-033, AC-034, AC-035
- Arquivos: src/app/presentation/features/corretoras/corretora-busca.ts
- Esforço: medio
- Notas: depende de T-010 e T-018. A busca por CNPJ é um endpoint próprio e não filtra inativos; busca sem resultado é estado vazio da própria busca, não card de erro. Exclusão é lógica.
