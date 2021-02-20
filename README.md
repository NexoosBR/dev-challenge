# Desafio Dev-Challenge

<h3> Sobre o Projeto </h3>
<p>O Neste desafio foi desenvolvida uma API simulando um dos fluxos da lógica de negócio da Nexoos, em que uma empresa poderá realizar uma solicitação de crédito que será analisada e em caso de aprovação mostrará uma proposta com as condições do empréstimo (número de parcelas, valor das parcelas e taxa de juros). Caso a empresa soliciante aprove as condições, o empréstimo será concedido e assim serão geradas todas as parcelas de pagamento.  </p>

<h3> Feito com </h3>

- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)

<h3> Começandos </h3>
<p>Para conseguir utilizar a aplicação siga os passos abaixo. </p>

<h2> Pré-requisitos </h2>

<p> É necessário ter em sua máquina um banco de dados Mysql rodando corretamente e deverá ser criado um novo schema com o nome de sua escolha </p>

<h2> Próximos passos: </h2>

1. Clone o repositório com o comando `git clone https://github.com/matbottini/dev-challenge.git`.
2. No diretório do repositório clonado, execute o comando `npm i` para a instalação das dependências.
3. Copie o arquivo `.env.example` e renomeie-o como `.env` configurando as credenciais de acesso ao banco de dados de sua aplicação.
4. Utilize o comando `npm run list-migration` para criar a migration responsável pela criação das tabelas.
5. Utilize o comando `npm run migrate` para executar a migration criada e assim gerar as tabelas.
6. Por fim, execute `npm run start` para iniciar o servidor.

<br>

<h3>Utilizando a aplicação</h3>
<p>Nesta aplicação inicialmente cadastraremos uma empresa, sendo que esta poderá criar uma solicitação de crédito vinculada a seu cadastro e estando dentro da faixa de valor irá permitir a criação da oferta do emprésimo. Estando a empresa solicitante de acordo com as condições, poderá efetuar o emprésimo e assim receber os dados das parcelas pactuadas com seu devido valor e data de vencimento. </p>

## Cadastrando uma nova Empresa

- **`POST /v1/create-company`**: A rota deve receber os dados da empresa dentro do corpo da requisição, sendo que fullAddress é um array e telephone também (em formato JSON):
```
{
  "companyName": "Matheus Bottini LTDA.",
  "cnpj": "56983168000119",
  "fullAddress": [
    {
      "address": "Alameda Santos",
      "number": 687,
      "cep": "01419001",
      "neighborhood": "Cerqueira César",
      "city": "São Paulo",
      "state": "SP"
    },
    {
      "address": "Alameda Santos 2",
      "number": 6872,
      "cep": "01419002",
      "neighborhood": "Cerqueira César 2",
      "city": "São Paulo 2",
      "state": "S2"
    }
  ],
  "telephone": [
    {
      "telephoneNumber": "954542610"
    },
    {
      "telephoneNumber": "923236718"
    }
  ]
}
```

Será retornado os dados da empresa com telefone e endereço cadastrado junto com o companyId para utilização na solicitação de crédito:

```
{
  "error": false,
  "result": {
    "company": {
      "companyName": "Matheus Bottini LTDA.",
      "cnpj": "56983168000119",
      "companyId": "2d2169b3-3a9b-4908-83fa-a05c9c8e3cbb",
      "created": "2021-02-20T03:54:27.668Z",
      "updated": "2021-02-20T03:54:27.668Z",
      "version": 1
    },
    "address": [
      {
        "companyId": "2d2169b3-3a9b-4908-83fa-a05c9c8e3cbb",
        "address": "Alameda Santos",
        "number": 687,
        "complement": "",
        "cep": "01419001",
        "neighborhood": "Cerqueira César",
        "city": "São Paulo",
        "state": "SP",
        "companyAddressId": "ad7ae98e-c46c-4834-8143-5ed38ba68cb5",
        "created": "2021-02-20T03:54:27.684Z",
        "updated": "2021-02-20T03:54:27.684Z",
        "version": 1
      },
      {
        "companyId": "2d2169b3-3a9b-4908-83fa-a05c9c8e3cbb",
        "address": "Alameda Santos 2",
        "number": 6872,
        "complement": "",
        "cep": "01419002",
        "neighborhood": "Cerqueira César 2",
        "city": "São Paulo 2",
        "state": "S2",
        "companyAddressId": "a110f652-77da-495c-a0e3-4b31f7309b34",
        "created": "2021-02-20T03:54:27.694Z",
        "updated": "2021-02-20T03:54:27.694Z",
        "version": 1
      }
    ],
    "telephone": [
      {
        "companyId": "2d2169b3-3a9b-4908-83fa-a05c9c8e3cbb",
        "telephone": "954542610",
        "updated": "2021-02-20T03:54:27.704Z",
        "companyTelephoneId": "e0fc6b45-02b9-4954-add3-c2c133b482d6",
        "created": "2021-02-20T03:54:27.704Z",
        "version": 1
      },
      {
        "companyId": "2d2169b3-3a9b-4908-83fa-a05c9c8e3cbb",
        "telephone": "923236718",
        "updated": "2021-02-20T03:54:27.716Z",
        "companyTelephoneId": "67c78225-452a-4db4-856f-6b217d198835",
        "created": "2021-02-20T03:54:27.716Z",
        "version": 1
      }
    ]
  }
}
```

## Criando uma solicitação de crédito

- **`POST /v1/create-credit-request`**: A rota deve receber `companyId` de uma empresa cadastrada e `value` dentro da faixa de valor de R$15.000,00 a R$1.800.000,00, no corpo da requisição (em formato JSON):

```
{
  "companyId": "2d2169b3-3a9b-4908-83fa-a05c9c8e3cbb",
  "value": "1700000"
}
```

Será retornado os dados da solicitação de crédito e uma mensagem contando se a solicitação foi aprovada (se estiver dentro da faixa de valor acima mencionada) para receber a oferta de empréstimo mediante o creditRequestId:

```
{
  "error": false,
  "result": {
    "companyId": "2d2169b3-3a9b-4908-83fa-a05c9c8e3cbb",
    "value": 1700000,
    "status": "approved",
    "creditRequestId": "d9f4da81-201e-41d2-a69f-b334e8f1416a",
    "created": "2021-02-20T04:00:09.849Z",
    "updated": "2021-02-20T04:00:09.849Z",
    "version": 1
  },
  "message": "Congratulations your credit request has been approved and you can now check our loan offer"
}
```


## Verificando a oferta de empréstimo

- **`GET /v1/loan-offer/:creditRequestId`**: A rota deve receber `creditRequestId` de uma solicitação de crédito já cadastrada dentro do parâmetro da requisição (em formato JSON):

No final será retornado os dados da oferta de empréstimo para, em caso de aceitação, pegarmos o loanId e utilizarmos na próxima etapa para firmar o empréstimo.

```
{
  "error": false,
  "result": {
    "loanId": "5ca32e13-502f-40b7-bdeb-84e5bebd3484",
    "loanValue": "R$ 1.700.000,00",
    "finalValue": "R$ 2.036.903,36",
    "interestRate": "1.5%",
    "numberOfInstallments": 24,
    "installmentValue": "R$ 84.870,97"
  }
}
```

## Confirmando a oferta de empréstimo

- **`POST /v1/make-loan`**: A rota deve receber `loanId` de uma oferta de empréstimo recebida, dentro do corpo da requisição (em formato JSON):

```
{
  "loanId": "5ca32e13-502f-40b7-bdeb-84e5bebd3484"
}
```

Será retornado os dados das parcelas criadas conforme as condições do empréstimo que foram aceitas, mostrando o valor e a data de pagamento de cada parcela intercalada de um mês a partir da data da confirmação do empréstimo mantendo o mesmo dia como dia de vencimento em todas as parcelas:

```
{
  "error": false,
  "result": [
    {
      "installmentId": "5d661e53-1ff2-4951-a776-40caa61e0b5f",
      "dueDate": "20-03-2021",
      "status": "pending"
    },
    {
      "installmentId": "5930fbd1-07ec-40e8-abc8-e68d6fac5cea",
      "dueDate": "20-04-2021",
      "status": "pending"
    },
    {
      "installmentId": "5e352157-59aa-4240-81e7-52c360470cc8",
      "dueDate": "20-05-2021",
      "status": "pending"
    },
    {
      "installmentId": "33d9a116-7d62-4422-933d-52fc8a61ff0c",
      "dueDate": "20-06-2021",
      "status": "pending"
    },
    {
      "installmentId": "3178cf55-10b7-4b44-aec7-399c9261d1b2",
      "dueDate": "20-07-2021",
      "status": "pending"
    },
    {
      "installmentId": "036eb1b3-cd0e-41df-bd6f-eacdd8c3e4ae",
      "dueDate": "20-08-2021",
      "status": "pending"
    },
    {
      "installmentId": "2bb555da-711b-4934-9205-d82052475382",
      "dueDate": "20-09-2021",
      "status": "pending"
    },
    {
      "installmentId": "a34012b7-2a97-48b1-b870-c56d9dd29897",
      "dueDate": "20-10-2021",
      "status": "pending"
    },
    {
      "installmentId": "c3617560-5ef0-4fcf-9115-315b78f09dce",
      "dueDate": "20-11-2021",
      "status": "pending"
    },
    {
      "installmentId": "926cde61-b6de-4e1b-a70f-c6ec28b70356",
      "dueDate": "20-12-2021",
      "status": "pending"
    },
    {
      "installmentId": "88913e13-24d3-4289-9740-1a0a8fb24f19",
      "dueDate": "20-01-2022",
      "status": "pending"
    },
    {
      "installmentId": "a8af3da5-4d9d-4ced-a628-e22c5c027e94",
      "dueDate": "20-02-2022",
      "status": "pending"
    },
    {
      "installmentId": "a9604c95-5ed8-462e-bc7e-145426d9319d",
      "dueDate": "20-03-2022",
      "status": "pending"
    },
    {
      "installmentId": "b973bfd3-ab43-4e2a-86e0-ac252011a924",
      "dueDate": "20-04-2022",
      "status": "pending"
    },
    {
      "installmentId": "5e2bb5be-81e2-4500-a32e-2840719275eb",
      "dueDate": "20-05-2022",
      "status": "pending"
    },
    {
      "installmentId": "26674c06-4cb1-4d36-a070-934db81cc19b",
      "dueDate": "20-06-2022",
      "status": "pending"
    },
    {
      "installmentId": "08db9364-1fa3-47f7-8bd5-24b29d4e1afb",
      "dueDate": "20-07-2022",
      "status": "pending"
    },
    {
      "installmentId": "1655aeff-602e-4ec1-929c-11f449a41661",
      "dueDate": "20-08-2022",
      "status": "pending"
    },
    {
      "installmentId": "a5e8efb4-4744-4dc8-be96-fce69fc8a033",
      "dueDate": "20-09-2022",
      "status": "pending"
    },
    {
      "installmentId": "ba2af0bc-459c-4cfe-9df2-fe7f583cffb8",
      "dueDate": "20-10-2022",
      "status": "pending"
    },
    {
      "installmentId": "fb40626f-d1a0-4ee2-a594-e6e8d10b0ea9",
      "dueDate": "20-11-2022",
      "status": "pending"
    },
    {
      "installmentId": "cee362da-7c41-44c0-8d80-c9698aa547e2",
      "dueDate": "20-12-2022",
      "status": "pending"
    },
    {
      "installmentId": "866b3747-9411-49cf-b6aa-f758535d9138",
      "dueDate": "20-01-2023",
      "status": "pending"
    },
    {
      "installmentId": "91209879-8db6-47f2-9df8-ca924d7376ca",
      "dueDate": "20-02-2023",
      "status": "pending"
    }
  ]
}
```

