# Gerenciamento de Produtos - Frontend

Aplicação web para gerenciamento de produtos desenvolvida como parte de um teste técnico.

O projeto foi construído utilizando Next.js, TypeScript e Tailwind CSS, com foco em organização de código, componentização, gerenciamento de estado global, consumo de API, responsividade e testes.

---

## Tecnologias utilizadas

- Next.js

- React

- TypeScript

- Tailwind CSS

- Zustand

- Jest

- React Testing Library

---

## Funcionalidades

A aplicação permite:

- Listar produtos

- Cadastrar novos produtos

- Excluir produtos

- Buscar produtos pelo nome

- Filtrar produtos por faixa de preço

- Ordenar produtos por preço crescente ou decrescente

- Paginar a lista de produtos

- Persistir alterações no navegador utilizando Local Storage

- Utilizar a aplicação em diferentes tamanhos de tela

Cada produto possui:

- Nome

- Categoria

- Descrição

- Preço

- URL da imagem

---

## API fictícia

Para simular o consumo de uma API, o projeto possui um endpoint criado através de uma Route Handler do Next.js:

```text

GET /api/products

```

O endpoint está localizado em:

```text

app/api/products/route.ts

```

Ele retorna uma lista mockada de produtos em formato JSON.

A aplicação não acessa diretamente esses dados.

A comunicação com o endpoint é feita através da camada:

```text

services/productService.ts

```

que realiza:

```ts

fetch("/api/products")

```

O fluxo utilizado é:

```text

Page

  ↓

Product Service

  ↓

GET /api/products

  ↓

Next.js Route Handler

  ↓

JSON

  ↓

Zustand

  ↓

Components

```

Essa separação permite substituir futuramente a API fictícia por uma API real sem concentrar a lógica de acesso aos dados nos componentes da interface.

---

## Gerenciamento de estado

O gerenciamento de estado global é realizado utilizando Zustand.

A store está localizada em:

```text

store/productStore.ts

```

Ela centraliza o estado dos produtos e operações como:

```text

products

setProducts

addProduct

deleteProduct

```

Os componentes utilizam a store para acessar e modificar o estado compartilhado da aplicação.

---

## Persistência local

Além do estado global com Zustand, a aplicação utiliza a API `localStorage` do navegador.

O comportamento utilizado é:

```text

Aplicação inicia

        ↓

Verifica Local Storage

        ↓

Existe informação salva?

    ↙                 ↘

  Sim                 Não

   ↓                    ↓

Carrega dados       GET /api/products

salvos                  ↓

                    API fictícia

```

Quando a lista de produtos é modificada, o estado atualizado é persistido novamente no Local Storage.

Dessa forma, produtos cadastrados ou removidos permanecem consistentes após uma atualização da página.

---

## Estrutura do projeto

A organização principal do frontend é:

```text

frontend/

│

├── app/

│   ├── api/

│   │   └── products/

│   │       └── route.ts

│   ├── globals.css

│   ├── layout.tsx

│   └── page.tsx

│

├── components/

│   ├── ProductCard.tsx

│   ├── ProductForm.tsx

│   └── ProductList.tsx

│

├── services/

│   └── productService.ts

│

├── store/

│   └── productStore.ts

│

├── types/

│   └── Product.ts

│

├── __tests__/

│   ├── ProductCard.test.tsx

│   ├── ProductCard.snapshot.test.tsx

│   └── __snapshots__/

│

├── public/

│

├── jest.config.ts

├── jest.setup.ts

├── package.json

├── tsconfig.json

└── README.md

```

### Responsabilidades

#### `app/`

Contém as páginas e rotas da aplicação Next.js.

#### `components/`

Contém os componentes reutilizáveis da interface, como formulário, lista e card de produto.

#### `services/`

Centraliza a comunicação com APIs.

#### `store/`

Contém o estado global da aplicação gerenciado pelo Zustand.

#### `types/`

Contém as interfaces TypeScript compartilhadas pela aplicação.

#### `__tests__/`

Contém os testes automatizados da aplicação.

---

## Responsividade

A interface utiliza os breakpoints responsivos do Tailwind CSS.

O layout foi estruturado para adaptar:

- formulário

- filtros

- lista de produtos

- cards

- imagens

- paginação

a diferentes tamanhos de tela.

---

## Paginação

A aplicação possui paginação da lista de produtos.

A lista filtrada é dividida em páginas, evitando a renderização de todos os produtos simultaneamente na interface.

A paginação funciona em conjunto com:

- busca

- filtros

- ordenação

---

## Testes

Os testes foram implementados utilizando:

- Jest

- React Testing Library

- Jest DOM

O projeto possui testes de renderização de componentes e teste de snapshot.

Para executar os testes:

```bash

npx jest

```

Resultado esperado:

```text

PASS ProductCard.test.tsx

PASS ProductCard.snapshot.test.tsx

```

O snapshot é armazenado automaticamente pelo Jest dentro de:

```text

__tests__/__snapshots__/

```

---

## Instalação

### Pré-requisitos

É necessário possuir Node.js e npm instalados.

Clone o repositório e acesse a pasta do frontend.

Instale as dependências:

```bash

npm install

```

---

## Executando a aplicação

Inicie o servidor de desenvolvimento:

```bash

npm run dev

```

Depois acesse no navegador:

```text

http://localhost:3000

```

---

## Build de produção

Para gerar a build:

```bash

npm run build

```

Para iniciar a versão de produção após a geração da build:

```bash

npm start

```

---

## Executando os testes

Execute:

```bash

npx jest

```

Também é possível executar os testes em modo watch:

```bash

npx jest --watch

```

---

## Decisões técnicas

### Next.js

Escolhido conforme requisito do desafio e utilizado tanto para a interface quanto para disponibilizar o endpoint fictício de produtos.

### TypeScript

Utilizado para garantir tipagem dos produtos, propriedades dos componentes, funções e estado da aplicação.

### Tailwind CSS

Utilizado para estilização e responsividade da interface.

### Zustand

Utilizado para centralizar o estado global dos produtos e evitar que o gerenciamento da lista fique restrito a um único componente.

### Product Service

Foi criada uma camada de serviço entre a interface e o endpoint de produtos para evitar que os componentes sejam responsáveis diretamente pela realização das requisições HTTP.

### Next.js Route Handler

Utilizada para disponibilizar uma API fictícia através de:

```text

GET /api/products

```

Isso permite que o frontend realize uma requisição HTTP e mantenha a camada de apresentação desacoplada dos dados mockados.

### Local Storage

Utilizado para persistir alterações feitas pelo usuário no navegador durante a utilização da aplicação.

### Jest e React Testing Library

Utilizados para testes automatizados dos componentes.

Também foi implementado um teste de snapshot para detectar alterações inesperadas na estrutura renderizada de um componente.

---

## Considerações finais

A aplicação foi estruturada buscando manter responsabilidades separadas entre:

```text

UI

↓

Components

↓

Service

↓

API

e

UI

↓

Global State

↓

Zustand

```

Essa organização facilita manutenção, testes e uma futura substituição da API fictícia por um backend real.