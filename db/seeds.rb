company = Company.create!(email: 'nexoos@nexoos.com0', password: '123nexoos')

company_profile = CompanyProfile.create!(name: 'Nexoos',
                                         document: '07.828.107/0001-71',
                                         company: company)
Address.create!(address: 'Avenida Rebouças, 867 - Pinheiros',
                zipcode: '12345-876', city: 'São Paulo', state: 'São Paulo',
                country: 'Brasil', addressable: company_profile)
Contact.create!(contact: 'nexoos@email.com', contact_type: :email, 
                contactable: company_profile)

proposal = Proposal.create!(value: 100_000, installments: 12,
                            expiration: 3.months.from_now,
                            company_profile: company_profile)

