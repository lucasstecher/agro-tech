# 🌱 Gerenciador de Produtores Rurais

Bem-vindo ao **Agro Tech**, um sistema desenvolvido em **Node.js com AdonisJS** para cadastro e gerenciamento de produtores, fazendas e culturas plantadas.

## 🌎 O projeto já está no ar!
Para acessá-lo, entre pelo link: https://agro-tech-production.up.railway.app/docs \
Como o servidor está situado nos EUA, é possível que lentidões aconteçam. \
Para realizar as requisições pela API, utilize Postman, Insomnia ou pelo próprio Scalar(docs).

## 🚀 Tecnologias Utilizadas

- **AdonisJS**
- **PostgreSQL**
- **Docker**
- **Japa (Testes)**
- **Swagger (Documentação)**
- **Lucid (ORM)**

---

## 📂 **Estrutura de Pastas**
O projeto segue a estrutura padrão do AdonisJS, organizada para manter a modularidade e a manutenção do código mais simples.

```sh
📦 projeto
├── 📂 app                # Contém a lógica principal da aplicação (Controllers, Models, Services, Middlewares)
│   ├── 📂 Controllers    # Arquivos responsáveis por lidar com as requisições HTTP
│   ├── 📂 Models         # Definição das entidades do banco de dados
│   ├── 📂 Services       # Lógica de negócios e regras de domínio
│   ├── 📂 Interfaces     # Definição de interfaces para padronizar a comunicação entre camadas
│   ├── 📂 Repositories   # Camada de abstração para acesso ao banco de dados
│   ├── 📂 Exceptions     # Gerenciamento de exceções e erros personalizados
│   ├── 📂 Middleware     # Interceptadores para processar requisições antes de chegarem aos controllers
│   └── 📂 Validators     # Definições de validações de entrada de dados
├── 📂 bin                # Scripts e arquivos executáveis do projeto
├── 📂 config             # Arquivos de configuração da aplicação (database, auth, swagger, etc.)
├── 📂 database           # Scripts de migração e seeds para o banco de dados
│   ├── 📂 migrations     # Definição da estrutura das tabelas do banco de dados
│   ├── 📂 seeders          # Dados iniciais para popular o banco
├── 📂 start              # Arquivos de bootstrapping e configuração inicial do AdonisJS
├── 📂 tests              # Testes automatizados da aplicação
```

---

## 📌 **Instalação e Configuração**

### Para rodar através do docker:
1. **Clone o repositório**
1. **Inclua todas as variáveis necessárias em seu .env:**
```sh
TZ=UTC
PORT=3333
APP_KEY=4vzgfBBrc8PI8WVqLx9QM2wTnZXYuo6r
NODE_ENV=development
DB_HOST=database
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_DATABASE=postgres
HOST=0.0.0.0 -> É necessário deixar o host com este valor para funcionar corretamente
LOG_LEVEL=info
```

2. **Abra seu terminal e digite o comando para subir o contâiner do docker:**
```sh
docker compose up --build
```

3. **Feito isso, sua aplicação já deve estar rodando! No terminal irá aparecer uma mensagem semelhante a esta:**
```sh
app_api | {"level":30,"time":1741618511020,"pid":1,"hostname":"db91f93a1693","msg":"started HTTP server on 0.0.0.0:3333"}
```
---

### Para rodar localmente:

### 🔹 **Pré-requisitos**

Antes de iniciar, certifique-se de ter instalado:

- **Node.js 20+**
- **Docker e Docker Compose**
- **PostgreSQL**
- **PNPM (ou npm/yarn, caso prefira)**

### 🔹 **Passo a Passo**

1. **Clone o repositório**
2. **Instale as dependências**
3. **Configure o ambiente**: Copie o arquivo .env.example e renomeie para .env, ajustando as variáveis de acordo com seu ambiente.
4. **Execute as migrations**:

```sh
node ace migration:run
```

5. **Execute as seeders (IMPORTANTE: rodar na ordem correta)**:

```sh
node ace db:seed --files "database/seeders/producer_seeder.ts"
```

```sh
node ace db:seed --files "database/seeders/property_seeder.ts"
```

```sh
node ace db:seed --files "database/seeders/planting_seeder.ts"
```

7. **Inicie a aplicação**:

```sh
npm run dev
```

---

## 📖 **Relacionamento entre Tabelas**

O banco de dados possui três entidades principais: **Produtores (Producers)**, **Fazendas (Properties)** e **Plantios (Plantings)**.

### 🔹 **Diagrama de Relacionamento**

| Producers |-- 1:N -- | Properties |-- 1:N -- | Plantings |

### 🔹 **Explicação**

#### **1. Producers (Produtores)**

- Cada produtor **pode ter várias fazendas** (1:N).
- **Campos**:
  - id (UUID, PK)
  - name (string)
  - document_type (CPF ou CNPJ)
  - document (string do documento)
  - city (string)
  - state (string)

#### **2. Properties (Fazendas)**

- Cada fazenda **pertence a um único produtor** (`producer_id`).
- Cada fazenda **pode ter vários plantios** (1:N).
- **Campos**:
  - id (UUID, PK)
  - producer_id (UUID, FK -> Producers)
  - farm_name (string)
  - city (string)
  - state (string)
  - total_area (float)
  - arable_area (float): Área cultivável
  - vegetation_area (float): Área de vegetação

#### **3. Plantings (Plantios)**

- Cada plantio **pertence a uma única fazenda** (`property_id`).
- **Campos**:
  - id (UUID, PK)
  - property_id (UUID, FK -> Producers)
  - harvest (string): Safra
  - culture (string): Cultura

---

### 🔹 **Restrições e Regras**

- **Integridade Referencial**:

  - Se um **produtor for excluído**, todas as **fazendas** relacionadas também são excluídas (**cascade delete**).
  - Se uma **fazenda for excluída**, todos os **plantios** relacionados também são removidos (**cascade delete**).

- **Regras de Área**:

  - A **área agricultável + área de vegetação** **não pode ser maior que a área total** da fazenda.

- **Validação de Documentos**:
  - O **CPF/CNPJ** do produtor é validado antes do cadastro.

---

## 📚 **Rotas da API**

Abaixo estão as principais rotas do sistema.

### 🔹 **Produtores (`/producers`)**

| Método     | Rota             | Descrição                 | Exemplo Body                                                           |
| ---------- | ---------------- | ------------------------- | ---------------------------------------------------------------------- |
| **GET**    | `/producers`     | Lista todos os produtores | -                                                                      |
| **GET**    | `/producers/:id` | Busca um produtor pelo ID | -                                                                      |
| **POST**   | `/producers`     | Cria um novo produtor     | `{ "name": "João", "documentType": "CPF", "document": "12345678900" }` |
| **PUT**    | `/producers/:id` | Atualiza um produtor      | `{ "name": "Maria" }`                                                  |
| **DELETE** | `/producers/:id` | Remove um produtor        | -                                                                      |

---

### 🔹 **Fazendas (`/properties`)**

| Método     | Rota                        | Descrição                     | Exemplo Body                                                                                                             |
| ---------- | --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **GET**    | `/properties/producer/:id` | Lista fazendas de um produtor | -                                                                                                                        |
| **GET**    | `/properties/:id`           | Busca uma fazenda pelo ID     | -                                                                                                                        |
| **POST**   | `/properties/producer/:id` | Cria uma nova fazenda         | `{ "farmName": "Fazenda 1", "city": "SP", "state": "SP", "totalArea": 100, "arableArea": 60, "vegetationArea": 40 }` |
| **PUT**    | `/properties/:id`           | Atualiza uma fazenda          | `{ "farmName": "Fazenda Nova" }`                                                                                        |
| **DELETE** | `/properties/:id`           | Remove uma fazenda            | -                                                                                                                        |

---

### 🔹 **Plantios (`/plantings`)**

| Método     | Rota                        | Descrição                        | Exemplo Body                               |
| ---------- | --------------------------- | -------------------------------- | ------------------------------------------ |
| **GET**    | `/plantings/property/:id` | Lista os plantios de uma fazenda | -                                          |
| **GET**    | `/plantings/:id`            | Busca um plantio pelo ID         | -                                          |
| **POST**   | `/plantings/property/:id` | Cria um novo plantio             | `{ "culture": "Soja", "harvest": "2024" }` |
| **PUT**    | `/plantings/:id`            | Atualiza um plantio pelo ID              | `{ "culture": "Milho" }`                   |
| **DELETE** | `/plantings/:id`            | Remove um plantio                | -                                          |

---

## 📊 **Dashboard & Estatísticas**

| Método  | Rota                        | Descrição                                           |
| ------- | --------------------------- | --------------------------------------------------- |
| **GET** | `/dashboard/total`    | Retorna total de fazendas e hectares cadastrados    |
| **GET** | `/dashboard/land-use` | Retorna percentual de área agricultável e vegetação |
| **GET** | `/dashboard/by-state`       | Retorna número de fazendas por estado               |
| **GET** | `/dashboard/by-crop`        | Retorna número de culturas plantadas                |

---

## 🛠 **Rodando Testes**

Antes de rodar os testes, lembre de já ter executado as **seeders** na seguinte ordem:

```sh
node ace db:seed --files "database/seeders/producer_seeder.ts"
node ace db:seed --files "database/seeders/property_seeder.ts"
node ace db:seed --files "database/seeders/planting_seeder.ts"
```

Agora, execute os **testes de unidade e integração**:

```sh
node ace test
```

---

## 📜 **Documentação OpenAPI**

A API conta com documentação **OpenAPI (Swagger)** gerada automaticamente. Para ter acesso, abra no navegador:

```sh
http://localhost:3333/docs
```

## **📌 Conclusão**

Este projeto implementa um sistema completo para o gerenciamento de produtores rurais, garantindo boas práticas, testes automatizados e documentação detalhada.

👨‍💻 Desenvolvido com ❤️ e AdonisJS. 🚀
