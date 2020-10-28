require 'rails_helper'

feature 'Company create profile' do
  scenario 'successfully' do
    company = Company.create(email: 'company1234@email.com',
                             password: 'company1234')

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    fill_in 'Nome', with: 'Empresa X'
    fill_in 'CNPJ', with: '11.1111.1111/11-11'
    fill_in 'Endereço', with: 'Avenida Rebouças, 999 - Pinheiros'
    fill_in 'CEP', with: '09823-234'
    fill_in 'Cidade', with: 'São Paulo'
    fill_in 'Estado', with: 'São Paulo'
    fill_in 'País', with: 'Brasil'
    fill_in 'Contato', with: 'company1234@email.com'
    select 'Email', from: 'Tipo'
    click_on 'Enviar'

    expect(page).to have_content 'Nome: Empresa X'
    expect(page).to have_content 'CNPJ: 11.1111.1111/11-11'
    expect(page).to have_content 'Endereço: Avenida Rebouças, 999 - Pinheiros'
    expect(page).to have_content 'Contato: company1234@email.com'
    expect(page).to have_content 'Tipo: Email'
  end

  scenario 'or get redirect if its already created' do
    company = Company.create(email: 'company1234@email.com',
                             password: 'company1234')
    company_profile = CompanyProfile.create(company: company, name: 'Empresa X',
                                            document: '11.1111.1111/11-11')
    Address.create(address: 'Avenida Rebouças, 999 - Pinheiros',
                  zipcode: '09823-234', city: 'São Paulo', state: 'São Paulo',
                  country: 'Brasil', addressable: company_profile)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'

    expect(page).to have_content 'Nome: Empresa X'
    expect(page).to have_content 'CNPJ: 11.1111.1111/11-11'
    expect(page).to have_content 'Endereço: Avenida Rebouças, 999 - Pinheiros'
  end

  scenario 'and must fill all fields' do
    company = Company.create(email: 'company1234@email.com',
      password: 'company1234')

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    fill_in 'Nome', with: 'Empresa X'
    fill_in 'CNPJ', with: ''
    fill_in 'Endereço', with: ''
    fill_in 'CEP', with: '09823-234'
    fill_in 'Cidade', with: 'São Paulo'
    fill_in 'Estado', with: ''
    fill_in 'País', with: 'Brasil'
    fill_in 'Contato', with: ''
    select 'Telefone', from: 'Tipo'
    click_on 'Enviar'

    expect(page).to have_content 'CNPJ não pode ficar em branco'
    expect(page).to have_content 'Endereço não pode ficar em branco'
    expect(page).to have_content 'Estado não pode ficar em branco'
    expect(page).to have_content 'Contato não pode ficar em branco'
  end
end