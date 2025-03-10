# curly-memory
# 🌱 Gerenciador de Produtores Rurais

Bem-vindo ao **Gerenciador de Produtores Rurais**, um sistema desenvolvido em **Node.js com AdonisJS** para cadastro e gerenciamento de produtores, fazendas e culturas plantadas.

## 🚀 Tecnologias Utilizadas
- **AdonisJS**
- **PostgreSQL**
- **Docker**
- **Japa (Testes)**
- **Swagger (Documentação)**
- **Lucid (ORM)**

---

## 📌 **Instalação e Configuração**

### 🔹 **Pré-requisitos**
Antes de iniciar, certifique-se de ter instalado:
- **Node.js 18+**
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
  - id *(UUID, PK)*
  - name *(string)*
  - documentType *(CPF ou CNPJ)*
  - document *(string do documento)*
  - city *(string)*
  - state *(string)*

#### **2. Properties (Fazendas)**
- Cada fazenda **pertence a um único produtor** (`producer_id`).
- Cada fazenda **pode ter vários plantios** (1:N).
- **Campos**: 
  - id *(UUID, PK)*
  - producer_id *(UUID, FK -> Producers)*
  - farm_name *(string)*
  - city *(string)*
  - state *(string)*
  - total_area *(float)*
  - arable_area *(float)*
  - vegetation_area *(float)*

#### **3. Plantings (Plantios)**
- Cada plantio **pertence a uma única fazenda** (`property_id`).
- **Campos**: 
  - id *(UUID, PK)*
  - property_id *(UUID, FK -> Producers)*
  - harvest *(string)*: Safra
  - culture *(string)*: Cultura

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

### 📚 **Rotas da API**

Abaixo estão as principais rotas do sistema.

🔹 Produtores (/producers)
Método	Rota	Descrição	Exemplo Body
GET	/producers	Lista todos os produtores	-
GET	/producers/:id	Busca um produtor pelo ID	-
POST	/producers	Cria um novo produtor	{ "name": "João", "document": "12345678900", "city": "SP", "state": "SP" }
PUT	/producers/:id	Atualiza um produtor	{ "name": "Maria" }
DELETE	/producers/:id	Remove um produtor	-

🔹 Fazendas (/properties)
Método	Rota	Descrição	Exemplo Body
GET	/producers/:id/properties	Lista fazendas de um produtor	-
GET	/properties/:id	Busca uma fazenda pelo ID	-
POST	/producers/:id/properties	Cria uma nova fazenda	{ "farm_name": "Fazenda 1", "city": "SP", "state": "SP", "total_area": 100, "arable_area": 60, "vegetation_area": 40 }
PUT	/properties/:id	Atualiza uma fazenda	{ "farm_name": "Fazenda Nova" }
DELETE	/properties/:id	Remove uma fazenda	-

🔹 Plantios (/plantings)
Método	Rota	Descrição	Exemplo Body
GET	/properties/:id/plantings	Lista os plantios de uma fazenda	-
GET	/plantings/:id	Busca um plantio pelo ID	-
POST	/properties/:id/plantings	Cria um novo plantio	{ "culture": "Soja", "harvest": "2024" }
PUT	/plantings/:id	Atualiza um plantio	{ "culture": "Milho" }
DELETE	/plantings/:id	Remove um plantio	-

📊 Dashboard & Estatísticas

Método	Rota	Descrição
GET	/dashboard/total-stats	Retorna total de fazendas e hectares cadastrados
GET	/dashboard/land-use-stats	Retorna percentual de área agricultável e vegetação
GET	/dashboard/by-state	Retorna número de fazendas por estado
GET	/dashboard/by-crop	Retorna número de fazendas por cultura plantada

🛠 Rodando Testes

Antes de rodar os testes, execute as seeders na seguinte ordem:

node ace db:seed --files "database/seeders/ProducerSeeder.ts"
node ace db:seed --files "database/seeders/PropertySeeder.ts"
node ace db:seed --files "database/seeders/PlantingSeeder.ts"
Agora, execute os testes de unidade e integração:

node ace test
