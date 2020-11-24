company = Company.create(name: 'Locaweb', cnpj: '123456456123')
company.addresses.create(street: 'abc', number: 50)
company.phones.create(number: '1155555555')

credit_request = company.credit_requests.create(
  amount: 100000,
  periods: 12,
  monthly_fee: 0.015,
  monthly_value: 9167.999290622945,
  status: 0
)
