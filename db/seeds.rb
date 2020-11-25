company1 = Company.create(name: 'Rede Globo de Televisão LTDA', cnpj: '25311055000145')
company1.addresses.create(street: 'José dos Palmares', number: 50)
company1.phones.create(number: '1155555555')

credit_request = company1.credit_requests.create(
  amount: 100000,
  periods: 12,
  monthly_fee: 1.5,
  monthly_value: 9167.999290622945,
  status: 0
)

company2 = Company.create(name: 'Seu José do Hotdog', cnpj: '44411055000145')
company2.addresses.create(street: 'José dos Hotdogs', number: 501)
company2.phones.create(number: '11955555555')

company2 = Company.create(name: 'Locaweb serviços de internet SA', cnpj: '55511055000145')
company2.addresses.create(street: 'Itapaiúna', number: 2404)
company2.phones.create(number: '1158965615')

company2 = Company.create(name: 'Universo online LTDA', cnpj: '88811055000145')
company2.addresses.create(street: 'Itapaiúna', number: 2405)
company2.phones.create(number: '1158925444')
