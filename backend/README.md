# Backend - E-commerce API

API RESTful para gerenciamento de produtos e pedidos, desenvolvida como parte de um teste técnico para desenvolvimento backend.

O projeto foi construído com NestJS e TypeScript, utilizando PostgreSQL como banco de dados, TypeORM para persistência, autenticação JWT, documentação com Swagger, testes unitários e ambiente Docker.

---

## Tecnologias

- Node.js

- NestJS

- TypeScript

- PostgreSQL

- TypeORM

- Docker

- Docker Compose

- JWT

- Swagger

- Jest

- class-validator

- class-transformer

---

## Arquitetura

O projeto foi organizado em camadas para separar responsabilidades:

```text

Request

   ↓

Controller

   ↓

Service

   ↓

Repository

   ↓

TypeORM

   ↓

PostgreSQL

```

### Controller

Responsável por receber e responder requisições HTTP.

### Service

Responsável pelas regras de negócio da aplicação.

### Repository

Responsável pelo acesso e persistência dos dados.

A camada de Service utiliza contratos de Repository, reduzindo o acoplamento com a implementação utilizando TypeORM.

---

## Organização do projeto

```text

src/

├── auth/

│   ├── dto/

│   ├── guards/

│   ├── auth.controller.ts

│   ├── auth.module.ts

│   └── auth.service.ts

│

├── common/

│   └── middleware/

│       └── logger.middleware.ts

│

├── products/

│   ├── dto/

│   ├── entities/

│   ├── repositories/

│   ├── products.controller.ts

│   ├── products.module.ts

│   └── products.service.ts

│

├── orders/

│   ├── dto/

│   ├── entities/

│   ├── enums/

│   ├── repositories/

│   ├── orders.controller.ts

│   ├── orders.module.ts

│   └── orders.service.ts

│

├── app.module.ts

└── main.ts

```

---

# Funcionalidades

## Produtos

A API permite:

- criar produtos;

- listar produtos;

- buscar produto por ID;

- editar produtos;

- excluir produtos.

Cada produto possui:

```text

id

nome

categoria

descricao

preco

quantidadeEstoque

```

### Endpoints

```text

POST    /products

GET     /products

GET     /products/:id

PUT     /products/:id

DELETE  /products/:id

```

---

## Pedidos

A API permite:

- criar pedidos;

- listar pedidos;

- adicionar múltiplos produtos e suas respectivas quantidades;

- calcular automaticamente o valor total;

- verificar disponibilidade de estoque;

- concluir pedidos;

- cancelar pedidos.

### Status disponíveis

```text

Pendente

Concluido

Cancelado

```

### Endpoints

```text

POST   /orders

GET    /orders

PATCH  /orders/:id/complete

PATCH  /orders/:id/cancel

```

---

## Regras de negócio dos pedidos

Durante a criação de um pedido:

1. cada produto informado é consultado no banco;

2. é verificado se o produto existe;

3. é verificado se existe estoque suficiente;

4. o preço atual do produto é registrado no item do pedido;

5. o total do pedido é calculado automaticamente;

6. o pedido é criado inicialmente com status `Pendente`.

O estoque não é reduzido enquanto o pedido está pendente.

Ao concluir o pedido:

1. o estoque é validado novamente;

2. as quantidades correspondentes são descontadas;

3. o status passa para `Concluido`.

Também existem validações para impedir:

- conclusão duplicada;

- conclusão de pedido cancelado;

- cancelamento de pedido já concluído;

- cancelamento duplicado.

---

# Modelagem de pedidos

Um pedido pode possuir diversos itens.

```text

Product

   ↑

   │

OrderItem

   │

   ↓

Order

```

O `OrderItem` mantém:

```text

produto

quantidade

precoUnitario

```

O preço unitário fica registrado no item do pedido para preservar o preço utilizado no momento da criação do pedido.

---

# Validação de dados

A API utiliza:

```text

class-validator

class-transformer

ValidationPipe

```

O `ValidationPipe` está configurado globalmente.

Entre as validações realizadas estão:

- campos obrigatórios;

- preço positivo;

- estoque não negativo;

- quantidade do pedido positiva;

- IDs numéricos;

- rejeição de propriedades não previstas nos DTOs.

---

# SOLID

O projeto utiliza princípios SOLID para manter responsabilidades bem separadas.

### Single Responsibility Principle

As responsabilidades são divididas entre:

```text

Controller → HTTP

Service    → regras de negócio

Repository → persistência

```

### Dependency Inversion Principle

Os Services utilizam contratos de Repository.

Exemplo:

```text

ProductsService

      ↓

IProductsRepository

      ↑

TypeOrmProductsRepository

```

Esse desacoplamento também facilita a criação de testes unitários utilizando mocks.

### Interface Segregation

Os contratos de Repository possuem somente as operações necessárias para seu respectivo domínio.

---

# Banco de dados

O projeto utiliza PostgreSQL.

A persistência é realizada através do TypeORM.

Principais tabelas:

```text

products

orders

order_items

```

---

# Middleware

Foi implementado um middleware de logging para registrar as requisições realizadas à aplicação.

Exemplo de saída:

```text

GET /products 200 - 10ms

POST /orders 201 - 20ms

```

---

# Autenticação JWT

A API possui autenticação simples utilizando JWT.

## Login

```text

POST /auth/login

```

Credenciais de demonstração:

```json

{

  "username": "admin",

  "password": "admin123"

}

```

Uma autenticação válida retorna:

```json

{

  "access_token": "JWT_TOKEN"

}

```

As rotas de Products e Orders são protegidas e devem receber:

```text

Authorization: Bearer <token>

```

A rota de login permanece pública.

> A autenticação foi mantida propositalmente simples para atender ao escopo do teste técnico. Não há persistência de usuários.

---

# Swagger

A documentação interativa da API está disponível em:

```text

http://localhost:3001/api

```

O Swagger permite:

- consultar os endpoints disponíveis;

- visualizar os DTOs;

- visualizar exemplos de payload;

- executar requisições;

- realizar autenticação Bearer JWT.

Para testar endpoints protegidos:

1. execute `POST /auth/login`;

2. copie o valor de `access_token`;

3. clique em `Authorize`;

4. informe o JWT;

5. execute os endpoints de Products ou Orders.

---

# Variáveis de ambiente

O projeto possui um arquivo:

```text

.env.example

```

Exemplo:

```env

PORT=3001

DB_HOST=localhost

DB_PORT=5432

DB_USER=postgres

DB_PASSWORD=postgres

DB_NAME=products_db

JWT_SECRET=your-secret-here

JWT_EXPIRES_IN=1h

```

Crie um arquivo `.env` baseado nesse exemplo.

O arquivo `.env` não deve ser versionado.

---

# Executando com Docker

## Pré-requisitos

- Docker

- Docker Compose

Com o arquivo `.env` configurado, execute na pasta `backend`:

```bash

docker compose up --build

```

O ambiente sobe:

```text

Docker Compose

├── NestJS

│   └── porta 3001

│

└── PostgreSQL

    └── porta 5432

```

API:

```text

http://localhost:3001

```

Swagger:

```text

http://localhost:3001/api

```

Para encerrar:

```bash

docker compose down

```

---

# Executando localmente

## Pré-requisitos

- Node.js

- npm

- PostgreSQL disponível de acordo com as variáveis do `.env`

Instale as dependências:

```bash

npm ci

```

Execute em desenvolvimento:

```bash

npm run start:dev

```

A aplicação ficará disponível, por padrão, em:

```text

http://localhost:3001

```

---

# Testes

Os testes utilizam Jest.

Execute toda a suíte:

```bash

npm test

```

Foram implementados testes envolvendo diferentes componentes da aplicação, incluindo regras de negócio importantes.

Entre os cenários cobertos estão:

- criação de produto;

- rejeição de pedido quando o estoque é insuficiente;

- impedimento de conclusão duplicada do pedido;

- atualização do estoque ao concluir pedido;

- inicialização isolada de Controllers e Services com dependências mockadas.

Os Repositories são mockados nos testes unitários quando apropriado, permitindo testar as regras dos Services sem necessidade de acessar o PostgreSQL.

---

# Build

Para validar a compilação do projeto:

```bash

npm run build

```

O código compilado é gerado em:

```text

dist/

```

O diretório `dist` não é versionado.

---

# Principais comandos

Instalar dependências:

```bash

npm ci

```

Executar em desenvolvimento:

```bash

npm run start:dev

```

Executar testes:

```bash

npm test

```

Gerar build:

```bash

npm run build

```

Subir ambiente Docker:

```bash

docker compose up --build

```

Parar ambiente Docker:

```bash

docker compose down

```

---

# Tratamento de erros

A API utiliza as exceções HTTP do NestJS para representar erros de negócio.

Entre os cenários tratados estão:

```text

404 Not Found

Produto ou pedido inexistente

400 Bad Request

Estoque insuficiente

Pedido já concluído

Pedido já cancelado

Transição de status inválida

401 Unauthorized

Token ausente

Token inválido

Token expirado

Credenciais inválidas

```

---

# Decisões técnicas

## PostgreSQL

Foi escolhido um banco relacional devido às relações naturais entre produtos, pedidos e itens dos pedidos.

## TypeORM

Foi utilizado para realizar o mapeamento das entidades e integração com PostgreSQL.

## Repository Pattern

A persistência foi isolada da regra de negócio através de Repositories.

Isso reduz o acoplamento entre os Services e a implementação de acesso a dados.

## Docker

O Docker Compose permite executar o backend e o PostgreSQL de forma reproduzível.

## JWT

Foi utilizada uma autenticação simples via Bearer Token, conforme o escopo do teste técnico.

## Swagger

Foi utilizado para documentar e testar interativamente os endpoints da API.

---

# Requisitos atendidos

## Obrigatórios

- [x] Node.js com NestJS

- [x] criação de produtos

- [x] listagem de produtos

- [x] edição de produtos

- [x] exclusão de produtos

- [x] ID de produto autogerado

- [x] categoria, descrição, preço e estoque

- [x] criação de pedidos

- [x] listagem de pedidos

- [x] múltiplos produtos e quantidades no pedido

- [x] cálculo do total do pedido

- [x] status do pedido

- [x] validação de estoque

- [x] atualização do estoque ao concluir pedido

- [x] separação Controller / Service / Repository

- [x] aplicação de princípios SOLID

- [x] banco de dados

- [x] middleware

- [x] testes unitários

## Diferenciais

- [x] Swagger

- [x] JWT

- [x] Docker

---

# Observações

Este backend foi desenvolvido como parte de um teste técnico, priorizando:

- organização;

- separação de responsabilidades;

- legibilidade;

- regras de negócio;

- testabilidade;

- boas práticas;

- facilidade de execução e avaliação.