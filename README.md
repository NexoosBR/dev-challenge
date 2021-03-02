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

<h3> Apresentação </h3>
<p>O propósito da aplicação é gerenciar o fluxo de criação de empréstimos. Primeiramente, um solicitante (Requester) deve ser cadastrado para poder criar uma solicitação de crédito (Loan Request) com o valor desejado. Com o Loan Request criado, um empréstimo (Loan) poderá ser criado ao enviar o ID do Loan Request juntamente com os dados restantes para gerar as parcelas de pagamento do empréstimo.</p>

<h3> Tecnologias e recursos utilizados </h3>

- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)

<h3> Configurando o banco de dados </h3>
<p>Esta aplicação utiliza o MySQL como banco de dandos, então tenha certeza de tê-lo rodando em sua máquina e crie um novo schema com o nome de sua preferência. Copie o arquivo "ormconfig.example.json" e renomeie-o como "ormconfig.json" e coloque as suas credenciais, junto com o nome do schema do seu banco de dados.</p>

<h3> Iniciando o servidor </h3>
<p>Com o Yarn instalado, siga os seguintes passos: </p>

1. Clone o repositório com o comando `git clone https://github.com/marcelo-amorim/dev-challenge.git`.
2. No diretório do repositório clonado, execute o comando `yarn` para a instalação das dependências.
4. Configure a as credenciais de acesso ao banco de dados no arquivo **ormconfig.json** utilizando o nome do schema criado anteriormente junto com suas credenciais.
5. Utilize o comando `yarn typeorm migration:run` para criação das tabelas.
6. Finalmente, execute `yarn dev:server` para iniciar o servidor.

Os testes de unidade e integração estão disponíveis juntamente com o coverage da aplicação através do comando ``` yarn test ```.

## Criando um solicitante (requester)

- **`POST /requester`**: A rota deve receber o `cnpj` (string), `companyName` - (string - razão social), `addresses` (array de string) e `phones` (array de string) dentro do corpo da requisição (em formato JSON):
```
{
	"cnpj": "84.441.864/0001-39",
	"companyName": "Nexoos",
	"addresses": [
		"R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030"
	],
	"phones": [
		"1149495929"
	]
}
```
Será retornado o solicitante cadastrado junto com o codigo (ID) para utilização na criação de solicitação de crédito:
```
{
  "id": "994d5695-f50c-4c5b-8a30-1db37d49c087",
  "companyName": "Nexoos",
  "cnpj": "84441864000139",
  "addresses": [
    {
      "address": "R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030",
      "requesterId": "994d5695-f50c-4c5b-8a30-1db37d49c087",
      "id": "363ec38d-211d-4799-a0f5-348d50b43850",
      "createdAt": "2021-02-20T04:14:42.000Z",
      "updatedAt": "2021-02-20T04:14:42.000Z"
    }
  ],
  "phones": [
    {
      "phone": "1149495929",
      "requesterId": "994d5695-f50c-4c5b-8a30-1db37d49c087",
      "id": "672a542b-83d3-449d-8e5b-da4844821796",
      "createdAt": "2021-02-20T04:14:42.000Z",
      "updatedAt": "2021-02-20T04:14:42.000Z"
    }
  ],
  "createdAt": "2021-02-20T04:14:42.000Z",
  "updatedAt": "2021-02-20T04:14:42.000Z"
}
```

Você também pode consultar um solicitante pela seguinte requisição:

- **`GET /requester/id-do-requester`**

## Criando uma solicitação de crédito (loan request)

- **`POST /loan-requests`**: A rota deve receber `value` (double) e `requesterId` (string - id do solicitante cadastrado) dentro do corpo da requisição (em formato JSON):
```
{
	"value": 100000,
	"requesterId": "994d5695-f50c-4c5b-8a30-1db37d49c087"
}
```

Será retornado a solicitação de crédito cadastrada:

```
{
  "value": 100000,
  "requesterId": "994d5695-f50c-4c5b-8a30-1db37d49c087",
  "loanRequestStatusId": "c96d21d3-693b-4112-8acc-48348c382cdd",
  "id": "96a3ed41-acce-4686-b84d-20ae019cffd3",
  "createdAt": "2021-02-20T04:18:56.000Z",
  "updatedAt": "2021-02-20T04:18:56.000Z"
}
```

Agora a solicitação poderá ser consultada através da URL:

- **`GET /loan-requests/id-do-loan-request`**

## Efetivando um empréstimo

<p>Com a solicitação de crédito criada, podemos efetivar um empréstimo passando os parâmetros restantes.</p>

- **`POST /loans`**: A rota deve receber `expirationDay` (number - dia de vencimento da parcela), `term` (number - número de períodos), `interestRate` (double - taxa de juros), e o `loanRequestId` (string) de uma solicitação de crédito já cadastrada, dentro do corpo da requisição (em formato JSON). O valor do empréstimos será o mesmo do valor da solicitação de crédito:

```
{
	"expirationDay": 5,
	"term": 12,
	"interestRate": 1.5,
	"loanRequestId": "c96d21d3-693b-4112-8acc-48348c382cdd"
}
```
No final será retornado o empréstimo juntamente com as suas parcelas:
```
{
  "value": "100000.00",
  "totalValue": 110015.99148747534,
  "term": 12,
  "interestRate": 1.5,
  "expirationDay": 5,
  "loanRequestId": "c96d21d3-693b-4112-8acc-48348c382cdd",
  "loanInstallments": [
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-03-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "63634ad7-5b4f-4c9e-82fd-93697e6e2232"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-04-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "0be34199-c0b2-4a39-ba1b-02c04711156b"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-05-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "f16de1c8-ebfc-4b42-8630-c84e8e409845"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-06-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "dd164d71-f9a0-4c19-b6f7-512363140251"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-07-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "9bf18ac5-b3a0-4588-a407-db03a0e6ae01"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-08-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "fd3e24e9-8db6-4723-86c2-f4763f9dd48f"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-09-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "8bd543fe-0688-49a3-888e-b31d8c358047"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-10-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "755b8ab8-5337-4cc4-b742-f1cd1e2c6c65"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-11-05T23:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "8866a79c-1ceb-4f09-9ace-fbee0798ba40"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-12-05T22:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "4997fd89-4133-4022-af90-3d0fcec3c6ed"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2022-01-05T22:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "36bd9fbb-3d21-44b4-91b4-24352b48782c"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2022-02-05T22:49:41.703Z",
      "loanId": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
      "id": "5b58cd19-566a-4078-914d-b66466d74ca3"
    }
  ],
  "id": "c10b6e04-5021-49bc-81d8-fd0fe68ea3b9",
  "createdAt": "2021-02-20T00:49:41.000Z",
  "updatedAt": "2021-02-20T00:49:41.000Z"
}
```

Agora, você também pode consultar o empréstimo a partir da seguinte rota:

- **`GET /loans/id-do-loan`**

## Simulação de empréstimo

<p>Nesta rota, você pode calcular diretamente as parcelas de um empréstimo sem passar pelo fluxo da aplicação. Basta enviar todos os dados para que o retorno das parcelas não seja persistido na base de dados, a partir de uma simulação em tempo real.</p>

- **`POST /loan-simulation`**: A rota deve receber `expirationDay` (number - dia de vencimento da parcela), `term` (number - número de períodos), `interestRate` (double - taxa de juros), `loanRequestId` (string) e o `value` (double - valor do empréstimo):

```
{
	"expirationDay": 10,
	"term": 12,
	"interestRate": 1.5,
	"value": 100000
}
```

e o retorno será algo parecido com isto:

```
{
  "value": 100000,
  "totalLoanValue": 110015.99148747534,
  "expirationDay": 10,
  "term": 12,
  "interestRate": 1.5,
  "loanInstallments": [
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-03-10T13:29:27.676Z"
    },
    {
      "value": 9167.999290622945,
      "paid": false,
      "expirationDate": "2021-04-10T13:29:27.676Z"
    },
    ...
  ]
}
```

<h3> Recursos e ferramentas </h3>

- [Workspace do Insomnia](https://gist.github.com/marcelo-amorim/ba1508e84c65d336e258e37195dd9f52) para testar as requisições.
- [Diagrama relacional das tabelas](https://dbdiagram.io/d/602de9e880d742080a3afb9e)

