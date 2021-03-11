# Nexoos Challenge

A Nexoos é uma plataforma online sem burocracia e sem taxas abusivas que conecta empresas
que necessitam de empréstimos a investidores pessoa Física tornando este processo mais rápido, eficiente e justo no modelo marketplace lending.

## Rodando o projeto  
Usando Docker & docker-compose  

Construindo a image do projeto com o comando build:  
```docker-compose build nexoos```

Execute a task para criar o banco de dados da Api:  
```docker-compose run --rm nexoos rails db:setup```

Execute o comando up para subir a aplicação:  
```docker-compose up nexoos```

Rodando os testes  
```docker-compose run -e "RAILS_ENV=test" --rm nexoos bundle exec rspec```
