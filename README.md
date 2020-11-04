# Nexoos Challenge

A Nexoos é uma plataforma online sem burocracia e sem taxas abusivas que conecta empresas
que necessitam de empréstimos a investidores pessoa Física tornando este processo mais rápido, eficiente e justo no modelo marketplace lending.

## Pre-requisites

- Docker and Docker Composer (optinal)
- Ruby ~> 2.7.1
- Rails ~> 6.0.3
- Postgres ~> 10.10
- Node ~> 13.12.0
- Yarn ~> 1.22.5

## Setup project with docker

1. `$ git clone https://bitbucket.org/lukaspol/dev-challenge`
1. `$ cd dev-challenge`
1. `$ cp config/database.yml.sample config/database.yml`
1. `$ cp .env.sample .env`
1. `$ docker-compose build`
1. `$ docker-compose up` (you can use the flag `-d`)
1. `$ docker-compose exec web bash`
1. `$ rake db:create`
1. `$ rake db:migrate`
1. `$ rake db:seed`
1. `$ rails s -b 0.0.0.0`

Open in browser [http://localhost:3000](http://localhost:3000)

## Setup project without docker
1. `$ git clone https://bitbucket.org/insight-sistemas/admdoc-web/`
1. `$ cd admdoc-web`
1. `$ cp config/database.yml.sample config/database.yml`
1. `$ cp .env.sample .env`
1. `$ bundle install`
1. `$ yarn install`
1. `$ rake db:create`
1. `$ rake db:migrate`
1. `$ rake db:seed`
1. `$ rails s`

Open in browser [http://localhost:3000](http://localhost:3000)

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
- Testes unitários.
- Inglês técnico(desejável);

Ao finalizar, faça um Pull Request neste repositório e avise-nos por email.
