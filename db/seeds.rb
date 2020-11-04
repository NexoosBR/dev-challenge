# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

company = Company.create!(
  name: 'Company Test',
  cnpj: '98.875.340/1555-20',
  email: 'company@example.com',
  password: 'changeme'
)

PhoneNumber.create(number: '(11)1111-1111', company: company)

Address.create(country: 'Pais',
  state: 'Estado',
  city: 'Cidade',
  neighborhood: 'bairro',
  street: 'Rua do bobo',
  number: '0',
  zipcode: '00.000-000',
  company: company
)

Loan.create(value: 15000, number_installments: 24, company: company)
