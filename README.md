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
- Testes unitários.
- Inglês técnico(desejável);

Ao finalizar, faça um Pull Request neste repositório e avise-nos por email.
