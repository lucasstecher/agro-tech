# curly-memory

- [x] fazer um validador para o cpf/cnpj do produtor
- [x] fazer validator de cada input de cada um
- [x] incluir o findAll no retorno das culturas por propriedade
- [x] incluir o findAll no retorno das propriedades por proprietário
- [x] implementar logs
- [x] fazer lógica do dashboard
- [x] incluir OpenAPI
- [ ] rodar as seeders em uma determinada ordem (producer -> property -> planting) CHAMAR ATENÇÃO PARA ISSO ANTES DE QUALQUER TESTE
- [ ] criar nova interface para rotas de dashboard; atualizar openapi do body do dashboard
- [x] testes unitários e de integração
- [ ] escrever um readme intuitivo
- [x] devidamente dockerizado
- [x] implementar tipagens corretas de cada um

```md
# Checklist de Implementação

Este checklist ajuda a garantir que todos os requisitos do projeto foram atendidos antes da entrega.

## ✅ Estrutura e Organização do Projeto

- [x] O projeto segue uma arquitetura em camadas (Controllers, Services, Models).
- [x] Aplicação dos princípios **SOLID**, **KISS** e **Clean Code**.
- [x] Organização clara das pastas e arquivos do projeto.

## ✅ Funcionalidades de Cadastro

- [x] CRUD completo para **Produtores Rurais** (Create, Read, Update, Delete).
- [x] Validação correta de **CPF/CNPJ**.
- [x] CRUD completo para **Propriedades Rurais** associadas a um produtor.
- [x] Cadastro de **Culturas Plantadas** por safra.
- [x] Relacionamento adequado entre **Produtor → Propriedades → Culturas/Safras**.

## ✅ Regras de Negócio

- [x] Soma da **área agricultável + área de vegetação** não pode ultrapassar a **área total da fazenda**.
- [x] Um produtor pode ter **0, 1 ou mais propriedades rurais**.
- [x] Uma propriedade rural pode ter **0, 1 ou mais culturas plantadas por safra**.

## ✅ Dashboard / Relatórios

- [x] Exibir **total de fazendas cadastradas**.
- [x] Exibir **total de hectares registrados**.
  - [x] Distribuição de fazendas por **estado**.
  - [x] Distribuição de **culturas plantadas**.
  - [x] Distribuição por **uso do solo** (área agricultável vs vegetação).

## ✅ API e Contratos

- [x] Definição clara das **rotas REST** seguindo boas práticas.
- [x] **Documentação OpenAPI/Swagger** criada e acessível.
- [x] Métodos HTTP bem definidos (`GET`, `POST`, `PUT`, `DELETE`).
- [x] Uso correto de **códigos de status HTTP** (`200`, `201`, `400`, `404`, etc.).

## ✅ Boas Práticas de Código

- [x] Código limpo e bem estruturado (**Clean Code** aplicado).
- [x] Uso de **ESLint** e **Prettier** para padronização do código.
- [x] Aplicação correta dos princípios **SOLID**.
- [x] Arquivos e classes possuem **nomes descritivos e intuitivos**.
- [x] Erros tratados corretamente com **mensagens claras**.

## ✅ Testes

- [x] **Testes unitários** cobrindo as principais regras de negócio.
- [x] **Testes de integração** para verificar os endpoints da API.
- [x] Testes automatizados incluídos no fluxo (`npm test` ou `yarn test`).

## ✅ Observabilidade e Logs

- [x] Uso de **logs estruturados** para facilitar a depuração.
- [x] Mensagens de erro claras e informativas.
- [x] Nenhuma informação sensível exposta nos logs.

## ✅ Documentação e Diagramas

- [ ] **README.md** completo com instruções de uso e instalação.
- [ ] Explicação clara sobre como configurar e rodar o projeto.
- [ ] Diagramas opcionais para arquitetura ou fluxo da aplicação.
- [x] Especificação **OpenAPI** da API disponível.

## ✅ Deploy (Bônus)

- [ ] Aplicação disponível em **produção ou ambiente de testes na nuvem**.
- [ ] Link para acesso público da API e/ou dashboard.
```
