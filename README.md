# Desafio Dev-Challenge

<h3> Sobre o Projeto </h3>
<p>O Neste desafio foi desenvolvida uma API simulando um dos fluxos da lógica de negócio da Nexoos, em que uma empresa poderá realizar uma solicitação de crédito que será analisada e em caso de aprovação mostrará uma proposta a empresa soliciante com as condições do empréstimo (número de parcelas, valor das parcelas e taxa de juros). Caso a empresa solicitante aprove as condições o empréstimo será concedido e assim serão geradas todas as parcelas de pagamento ao longo dos meses.  </p>

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
5. Utilize o comando `npm run migrate` para criação das tabelas.
6. Por fim, execute `npm run start` para iniciar o servidor.

<br>

<h3>Utilizando a aplicação</h3>
<p>Nesta aplicação inicialmente cadastraremos uma empresa, sendo que esta poderá criar uma solicitação de crédito vinculada a seu cadastro e estando dentro da faixa de valor irá permitir a criação da oferta do emprésimo. Estando a empresa solicitante de acordo com as condições, poderá efetuar o emprésimo e assim receber os dados das parcelas pactuadas com seu devido valor e data de vencimento. </p>

## Cadastrando uma nova Empresa

- **`POST /fundos`**: A rota deve receber o `cnpj`, `nome` e `rendimentoAnual` dentro do corpo da requisição (em formato JSON):
```
{
  "cnpj": "82867342000178",
  "nome": "SAO PAULO PREV RF VGBL",
  "rendimentoAnual": 6
}
```
Será retornado o fundo cadastrado junto com o codigo para utilização no cadastro das propostas:
```
{
  "cnpj": "82867342000178",
  "nome": "SAO PAULO PREV RF VGBL",
  "rendimentoAnual": 6,
  "id": 6,
  "createdAt": "2020-09-03T07:07:13.000Z",
  "updatedAt": "2020-09-03T07:07:13.000Z"
}
```


## Criando usuário

- **`POST /users`**: A rota deve receber `username` e `password` dentro do corpo da requisição (em formato JSON):


```
{
  "username": "johndoe",
  "password": "p@$$w0rd"
}
```

## Criando asessor

- **`POST /assessores`**: A rota deve receber `nome` e o `userId` de um usuário já cadastrado dentro do corpo da requisição (em formato JSON):

```
{
  "nome": "John Doe",
  "userId": 6
}
```
No final será retornado o assessor cadastrado.

## Autenticando

- **`POST /session`**: A rota deve receber `username` e `password` dentro do corpo da requisição (em formato JSON) para autenticar um novo usuário:

```
{
  "username": "johndoe",
  "password": "p@$$w0rd"
}
```
Será retornado um token JWT para utilização nas requisições seguintes:


```
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "createdAt": "2020-09-04T03:27:40.000Z",
    "updatedAt": "2020-09-04T03:27:40.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3Nlc3NvcklkIjoxLCJpYXQiOjE1OTkxOTAxMzIsImV4cCI6MTU5OTI3NjUzMiwic3ViIjoiMSJ9.cFC4mpi8Nmt7nIdKgiAI0iQeL0HrUm6itLBvO-EM0P4"
}
```

## Cadastrando novos clientes
A rota de clientes faz uso do token do assesor autenticado para cadastrar novos clientes, então, a partir daqui, todas as requisiçes devem conter um `Bearer {token}` na header **Authorization**:

- **`POST /clientes`**: A rota deve receber `nome`, `cpf` e `email` dentro do corpo da requisição (em formato JSON):

```
{
  "nome": "Jane Doe",
  "cpf": "754.818.192-28",
  "email": "jane@doe.com"
}
```
No final, um novo cliente será cadastrado para o assessor autenticado:
```
{
  "nome": "Jane Doe",
  "cpf": "75481819228",
  "email": "jane@doe.com",
  "assessorId": 1,
  "id": 10,
  "createdAt": "2020-09-03T07:06:45.000Z",
  "updatedAt": "2020-09-03T07:06:45.000Z"
}
```
- **`GET /clientes`**: Traz a lista contendo todos os clientes do assessor autenticado.

- **`GET /clientes/:id`**: Retorna o cliente especificado pelo ID. O cliente só será retornado se pertencer ao assessor autenticado.

## Cadastrando propostas

- **`POST /propostas`**: A rota deve receber `valor`, `tipoPagamento` ('boleto' ou 'debito'), `fundoId` de um fundo já cadastrado e o `clienteId` de um cliente já cadastrado dentro do corpo da requisição (em formato JSON) para criar uma nova proposta para o cliente do assessor autenticado:

```
{
  "valor": 100,
  "tipoPagamento": "boleto",
  "fundoId": 1,
  "clienteId": 1
}
```
No final, será retornada a proposta cadastrada contendo um campo `codigo` para ser usado posteriormente no cálculo de rendimentos da proposta:
```
{
  "valor": 100,
  "tipoPagamento": "boleto",
  "fundoId": 1,
  "clienteId": 1,
  "codigo": 5,
  "createdAt": "2020-09-03T07:07:10.000Z",
  "updatedAt": "2020-09-03T07:07:10.000Z"
}
```
- **`GET /propostas/:codigo`**: retorna uma proposta com o código informado.


## Cálculo de rendimentos

- **`POST /rendimentos`**: retorna o cálculo de rendimentos de acordo com a `dataInicial`, `proposta` (código da proposta) e `meses` a partir da data inicial:
```
{
  "dataInicial": "2020-09-01",
  "proposta": 1,
  "meses": 3
}
```
será retornado o cálculo do rendimento da proposta informada de acordo com as datas enviadas:
```
[
  {
    "data": "2020-02-01T00:00:00.000Z",
    "proposta": 1,
    "valor": 101
  },
  {
    "data": "2020-03-03T01:00:00.000Z",
    "proposta": 1,
    "valor": 102.01
  },
  {
    "data": "2020-04-01T01:00:00.000Z",
    "proposta": 1,
    "valor": 103.03
  },
]
```

