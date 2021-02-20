# Nexoos Challenge

A Nexoos é uma plataforma online sem burocracia e sem taxas abusivas que conecta empresas
que necessitam de empréstimos a investidores pessoa Física tornando este processo mais rápido, eficiente e justo no modelo marketplace lending.

## Desafio

Cenário: Na Nexoos, um empréstimo de R$ 100.000,00 pode ser financiado por até 200 pessoas e cada um recebe uma fatia proporcional das parcelas pagas.

Simulando uma taxa de 1.5% a.m. em 12x, teríamos 12 parcelas de R$ 9.168,00.

O valor da parcela é calculado usando a fórmula `pmt`:

```
pmt = valor_presente * ((((1 + taxa) ** numero_de_periodos) * taxa) / (((1 + taxa) ** numero_de_periodos) - 1))
```

Exemplo:

```
100000 * ((((1.015) ** 12) * 0.015) / (((1.015) ** 12) - 1)) = 9167.999290622945
```

Construa uma aplicação web, utilizando a linguagem e frameworks de sua preferência, que seja capaz de:
- Cadastrar um solicitante(razão social, cnpj, endereço(s) e telefone(s));
- Criar uma solicitação de crédito(valor);
- Pedir um empréstimo informando valor, prazo e taxa de juros.
- Gerar automaticamente as respectivas parcelas com intervalos regulares de um mês entre os vencimentos. 

## Requisitos:

- O código no repositório público do GitHub;
- Utilizar Postgres, MySQL ou o banco de dados de sua preferência ;
- Testes.
- Inglês técnico(desejável);

Ao finalizar, faça um Pull Request neste repositório e avise-nos por email.

---

## Pré-requisitos

* NodeJS 12+

### Principais ferramentas utilizadas

- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)

## Começando

Para utilizar aplicação com uma cópia local dos arquivos, siga os passos abaixo.

### Instalação

1. Clone o repositório com o comando `git clone https://github.com/SamuelSabino/dev-challenge.git`.

2. Depois de clonado, na raiz do projeto, execute o comando abaixo para a instalação das dependências.


```text
npm install
```

ou

```text
yarn install
```
 3. Para configurar o banco de dados (MySQL), você precisa ter instalado em sua máquina e através de uma interface para gerenciar suas instancias, crie um banco de dados com o comando abaixo, se preferir:

 ```
  CREATE DATABASE 'nexoos_db';
 ```

 4. Depois de criado a base de dados, execute o comando abaixo para criar as tabelas e relacionamentos:

 ```
 npm run typeorm migration:run
 ```

 ou 

 ```
 yarn typeorm migration:run
 ```


5. E por fim, execute o comando abaixo para inicialização do servidor:

```text
npm run start
```

ou

```text
yarn start
```

Após executado o comando, a aplicação será inicializada com todas as dependências instaladas e configuradas.

## Utilizando a aplicação

## Criação de Cliente / Empresa / Solicitante

 - **`POST /clients`**: Para cadastrar um solicitante a rota precisa receber, dentro do corpo da requisição, um objeto em formato JSON contendo os campos `companyName`, `address` e `phone`, sendo `address` e `phone` uma lista de itens:

URL:

 ```
 [POST] http://localhost:8080/clients
 ```

Um exemplo de objeto que será enviado no corpo da requisição:

 ```
  {
    "companyName": "Nexoos S.A.",
    "cnpj": "41630563000140",
    "address": [
      {
        "zipCode": "12345321",
        "address": "Avenida Teste",
        "addressNumber": 101,
        "complement": "apt 32",
        "district": "Centro",
        "city": "Teste City",
        "state": "Tester"
      }
    ],
    "phone": [{ "phoneNumber": "940028922" }]
  }
 ```

 Um exemplo do objeto de retorno:
 ```
  {
    "error": false,
    "result": {
      "cnpj": "41630563000140",
      "companyName": "Nexoos S.A.",
      "id": "56efae41-416c-4f75-b8b5-697de31f99f7",
      "created": "2021-02-20T03:40:26.000Z",
      "updated": "2021-02-20T03:40:26.000Z",
      "version": 1
    },
    "message": "Client successfully created."
  }
 ```

 ## Criar uma solicitação de Crédito

 - **`POST /loans`**: Para criar uma solicitação de crédito, dentro do corpo da requisição precisa ter o valor da solicitação nomeado como `creditRequestValue` e na url, o id do solicitante:

URL:

 ```
 [POST] http://localhost:8080/loans/56efae41-416c-4f75-b8b5-697de31f99f7
 ```

 Será retornado o produto correspondente aquele identificador:
 ```
  {
    "error": false,
    "result": {
      "creditRequestId": "9a45aa2c-82fb-4891-921a-9cf9da5f94ed"
    },
    "message": "Your credit request was successful"
  }
 ```

 ## Verificar status da solicitação de crédito / empréstimo.

 - **`GET loans/status/:id`**: Para verificar o status da solicitação realizada (ou até mesmo do empréstimo feito), aponte para o endpoint abaixo passando o identificador da solicitação / empréstimo:

URL:

 ```
 [GET] http://localhost:8080/loans/status/9a45aa2c-82fb-4891-921a-9cf9da5f94ed
 ```

 Será retornado uma mensagem informando o status atual da sua solicitação ou impréstimo:
 ```
  {
    "error": false,
    "result": {
      "status": "pending"
    },
    "message": "Your loan status is: pending"
  }
 ```

 ## Fazer um empréstimo

 - **`POST /loans/make-loan/:id`**: Para efetuar o empréstimo você precisa enviar, na url da requisição, o id da sua solicitação, seguindo o exemplo abaixo:

URL:

 ```
 [POST] http://localhost:8080/loans/make-loan/9a45aa2c-82fb-4891-921a-9cf9da5f94ed
 ```

 Será retornado um objeto confirmando sua solicitação de empréstimo:
 ```
  {
    "error": false,
    "result": {
      "id": "9a45aa2c-82fb-4891-921a-9cf9da5f94ed",
      "creditRequestValue": "500000",
      "status": "approved",
      "installments": 12,
      "interestRate": "2.0",
      "loanValue": "1000001.8816799638",
      "created": "2021-02-20T03:49:53.000Z",
      "updated": "2021-02-20T04:41:54.000Z",
      "version": 2
    },
    "message": "Your loan has been approved."
  }
 ```

 ## Convenções
 ### Estilo

* eslint com o padrão de regras [standard](https://standardjs.com).

### Nomenclatura das Pastas

* utilização do estilo de escrita kebab-case para todas as pastas.

### Arquivos
* kebab-case utilizado para todos os arquivos.
* arquivos de testes utilizando o padrão *.spec.ts (para testes de unidade) e *.test.ts (para testes de integração).

## Visão Geral da Arquitetura

```text
├── src/
│   ├── modules/
│   │   └── products/
|   │   │   └── dtos/
|   |   │   │   └── *.dto.ts
|   │   │   └── infra/
|   |   │   │   └── http/
|   |   |   │   │   └── controllers/
|   |   |   |   │   │   └── *.controller.ts
|   |   |   │   │   └── routers/
|   |   |   |   │   │   └── *.router.ts
|   |   |   │   │   └── schemas/
|   |   |   |   │   │   └── *.schema.ts
|   |   │   │   └── mongo/
|   |   |   │   │   └── models/
|   |   |   |   │   │   └── *.model.ts
|   |   |   │   │   └── repositories/
|   |   |   |   │   │   └── *.repository.ts
|   │   │   └── interfaces/
|   |   │   │   └── *.interface.ts/
|   │   │   └── use-case/
|   |   │   │   └── *.use-case.ts/
│   ├── shared/
|   │   ├── errors/
|   |   │   ├── *.error.ts
|   │   ├── infra/
|   |   │   └── http/
|   |   │   │   └── routers/
|   |   |   │   │   └── index.router.ts
|   |   │   │   └── app.ts
|   |   │   │   └── server.ts
|   │   │   └── typeorm/
|   |   │   │   └── migrations/
|   |   |   │   │   └── *.ts
|   |   │   │   └── index.ts
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── jest.config.ts
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```
