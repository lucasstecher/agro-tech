# curly-memory
- [X] fazer um validador para o cpf/cnpj do produtor
- [X] fazer validator de cada input de cada um
- [X] incluir o findAll no retorno das culturas por propriedade
- [X] incluir o findAll no retorno das propriedades por proprietário
- [X] implementar logs
- [X] fazer lógica do dashboard
- [X] incluir OpenAPI
- [ ] rodar as seeders em uma determinada ordem (producer -> property -> planting) CHAMAR ATENÇÃO PARA ISSO ANTES DE QUALQUER TESTE
- [ ] criar nova interface para rotas de dashboard; atualizar openapi do body do dashboard
- [X] testes unitários e de integração
- [ ] escrever um readme intuitivo 
- [x] devidamente dockerizado
- [X] implementar tipagens corretas de cada um

```md
# Checklist de Implementação

Este checklist ajuda a garantir que todos os requisitos do projeto foram atendidos antes da entrega.

## ✅ Estrutura e Organização do Projeto
- [X] O projeto segue uma arquitetura em camadas (Controllers, Services, Models).
- [X] Aplicação dos princípios **SOLID**, **KISS** e **Clean Code**.
- [X] Organização clara das pastas e arquivos do projeto.

## ✅ Funcionalidades de Cadastro
- [X] CRUD completo para **Produtores Rurais** (Create, Read, Update, Delete).
- [X] Validação correta de **CPF/CNPJ**.
- [X] CRUD completo para **Propriedades Rurais** associadas a um produtor.
- [X] Cadastro de **Culturas Plantadas** por safra.
- [X] Relacionamento adequado entre **Produtor → Propriedades → Culturas/Safras**.

## ✅ Regras de Negócio
- [X] Soma da **área agricultável + área de vegetação** não pode ultrapassar a **área total da fazenda**.
- [X] Um produtor pode ter **0, 1 ou mais propriedades rurais**.
- [X] Uma propriedade rural pode ter **0, 1 ou mais culturas plantadas por safra**.

## ✅ Dashboard / Relatórios
- [X] Exibir **total de fazendas cadastradas**.
- [X] Exibir **total de hectares registrados**.
  - [X] Distribuição de fazendas por **estado**.
  - [X] Distribuição de **culturas plantadas**.
  - [X] Distribuição por **uso do solo** (área agricultável vs vegetação).

## ✅ API e Contratos
- [X] Definição clara das **rotas REST** seguindo boas práticas.
- [X] **Documentação OpenAPI/Swagger** criada e acessível.
- [X] Métodos HTTP bem definidos (`GET`, `POST`, `PUT`, `DELETE`).
- [X] Uso correto de **códigos de status HTTP** (`200`, `201`, `400`, `404`, etc.).

## ✅ Boas Práticas de Código
- [X] Código limpo e bem estruturado (**Clean Code** aplicado).
- [X] Uso de **ESLint** e **Prettier** para padronização do código.
- [X] Aplicação correta dos princípios **SOLID**.
- [X] Arquivos e classes possuem **nomes descritivos e intuitivos**.
- [X] Erros tratados corretamente com **mensagens claras**.

## ✅ Testes
- [X] **Testes unitários** cobrindo as principais regras de negócio.
- [X] **Testes de integração** para verificar os endpoints da API.
- [X] Testes automatizados incluídos no fluxo (`npm test` ou `yarn test`).

## ✅ Observabilidade e Logs
- [X] Uso de **logs estruturados** para facilitar a depuração.
- [X] Mensagens de erro claras e informativas.
- [X] Nenhuma informação sensível exposta nos logs.

## ✅ Documentação e Diagramas
- [ ] **README.md** completo com instruções de uso e instalação.
- [ ] Explicação clara sobre como configurar e rodar o projeto.
- [ ] Diagramas opcionais para arquitetura ou fluxo da aplicação.
- [X] Especificação **OpenAPI** da API disponível.

## ✅ Deploy (Bônus)
- [ ] Aplicação disponível em **produção ou ambiente de testes na nuvem**.
- [ ] Link para acesso público da API e/ou dashboard.

```
