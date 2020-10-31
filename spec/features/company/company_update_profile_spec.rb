require 'rails_helper'

feature 'Company update profile' do
  scenario 'successfully' do
    company = create(:company, email: 'nexoos@nexoos.com')
    company_profile = create(:company_profile, name: 'Nexoos', company: company)
    create(:address, address: 'Avenida Paulista, 5000 - Bela Vista',
                     zipcode: '12345-678', city: 'São Paulo', state: 'São Paulo',
                     country: 'Brasil', addressable: company_profile)
    create(:contact, contact: '11 99999-9999', contact_type: :telefone,
                     contactable: company_profile)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    click_on 'Editar Perfil'
    fill_in 'Endereço', with: 'Avenida Rebouças, 875 - Pinheiros'
    fill_in 'CEP', with: '87654-321'
    fill_in 'Contato', with: 'nexoos@nexoos.com'
    select 'Email', from: 'Tipo'
    click_on 'Enviar'

    expect(page).not_to have_content 'Endereço: Avenida Paulista, 5000 - Bela Vista'
    expect(page).not_to have_content 'CEP: 12345-678'
    expect(page).to have_content 'Endereço: Avenida Rebouças, 875 - Pinheiros'
    expect(page).to have_content 'CEP: 87654-321'
    expect(page).not_to have_content 'Contato: 11 99999-9999'
    expect(page).not_to have_content 'Tipo: Telefone'
    expect(page).to have_content 'Contato: nexoos@nexoos.com'
    expect(page).to have_content 'Tipo: Email'
  end

  scenario 'and must fill all fields' do
    company = create(:company, email: 'nexoos@nexoos.com')
    company_profile = create(:company_profile, name: 'Nexoos', company: company)
    create(:address, address: 'Avenida Paulista, 5000 - Bela Vista',
                     zipcode: '12345-678', city: 'São Paulo', state: 'São Paulo',
                     country: 'Brasil', addressable: company_profile)
    create(:contact, contact: '11 99999-9999', contact_type: :telefone,
                     contactable: company_profile)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    click_on 'Editar Perfil'
    fill_in 'Endereço', with: ''
    fill_in 'CEP', with: ''
    fill_in 'Contato', with: ''
    click_on 'Enviar'

    expect(page).to have_content 'Endereço não pode ficar em branco'
    expect(page).to have_content 'CEP não pode ficar em branco'
    expect(page).to have_content 'Contato não pode ficar em branco'
  end

  scenario 'and add new addresses' do
    company = create(:company, email: 'nexoos@nexoos.com')
    company_profile = create(:company_profile, name: 'Nexoos', company: company)
    create(:address, address: 'Avenida Paulista, 5000 - Bela Vista',
                     zipcode: '12345-678', city: 'São Paulo', state: 'São Paulo',
                     country: 'Brasil', addressable: company_profile)
    create(:contact, contact: '11 99999-9999', contact_type: :telefone,
                     contactable: company_profile)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    click_on 'Adicionar Novo Endereço'
    fill_in 'Endereço', with: 'Avenida Rebouças, 875 - Pinheiros'
    fill_in 'CEP', with: '87654-321'
    fill_in 'Cidade', with: 'São Paulo'
    fill_in 'Estado', with: 'São Paulo'
    fill_in 'País', with: 'Brasil'
    click_on 'Salvar Endereço'

    expect(page).to have_content 'Endereço adicionado com sucesso!'
    expect(page).to have_content 'Endereço: Avenida Paulista, 5000 - Bela Vista'
    expect(page).to have_content 'CEP: 12345-678'
    expect(page).to have_content 'Endereço: Avenida Rebouças, 875 - Pinheiros'
    expect(page).to have_content 'CEP: 87654-321'
  end

  scenario 'and must fill all fields' do
    company = create(:company, email: 'nexoos@nexoos.com')
    company_profile = create(:company_profile, name: 'Nexoos', company: company)
    create(:address, address: 'Avenida Paulista, 5000 - Bela Vista',
                     zipcode: '12345-678', city: 'São Paulo', state: 'São Paulo',
                     country: 'Brasil', addressable: company_profile)
    create(:contact, contact: '11 99999-9999', contact_type: :telefone,
                     contactable: company_profile)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    click_on 'Adicionar Novo Endereço'
    fill_in 'Endereço', with: 'Avenida Rebouças, 875 - Pinheiros'
    fill_in 'CEP', with: '87654-321'
    fill_in 'Cidade', with: ''
    fill_in 'Estado', with: ''
    fill_in 'País', with: ''
    click_on 'Salvar Endereço'

    expect(page).to have_content 'Endereço não adicionado. Preencha todos os campos!'
    expect(page).to have_content 'Endereço: Avenida Paulista, 5000 - Bela Vista'
    expect(page).to have_content 'CEP: 12345-678'
    expect(page).not_to have_content 'Endereço: Avenida Rebouças, 875 - Pinheiros'
    expect(page).not_to have_content 'CEP: 87654-321'
  end

  scenario 'and add new contact' do
    company = create(:company, email: 'nexoos@nexoos.com')
    company_profile = create(:company_profile, name: 'Nexoos', company: company)
    create(:address, address: 'Avenida Paulista, 5000 - Bela Vista',
                     zipcode: '12345-678', city: 'São Paulo', state: 'São Paulo',
                     country: 'Brasil', addressable: company_profile)
    create(:contact, contact: '11 99999-9999', contact_type: :telefone,
                     contactable: company_profile)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    click_on 'Adicionar Novo Contato'
    fill_in 'Contato', with: 'nexoos@nexoos.com'
    select 'Email', from: 'Tipo'
    click_on 'Salvar Contato'

    expect(page).to have_content 'Contato adicionado com sucesso!'
    expect(page).to have_content 'Contato: 11 99999-9999'
    expect(page).to have_content 'Tipo: Telefone'
    expect(page).to have_content 'Contato: nexoos@nexoos.com'
    expect(page).to have_content 'Tipo: Email'
  end

  scenario 'and must fill all fields' do
    company = create(:company, email: 'nexoos@nexoos.com')
    company_profile = create(:company_profile, name: 'Nexoos', company: company)
    create(:address, address: 'Avenida Paulista, 5000 - Bela Vista',
                     zipcode: '12345-678', city: 'São Paulo', state: 'São Paulo',
                     country: 'Brasil', addressable: company_profile)
    create(:contact, contact: '11 99999-9999', contact_type: :telefone,
                     contactable: company_profile)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Perfil'
    click_on 'Adicionar Novo Contato'
    fill_in 'Contato', with: ''
    click_on 'Salvar Contato'

    expect(page).to have_content 'Contato não adicionado. Preencha todos os campos!'
    expect(page).to have_content 'Contato: 11 99999-9999'
    expect(page).to have_content 'Tipo: Telefone'
    expect(page).not_to have_content 'Contato: nexoos@nexoos.com'
    expect(page).not_to have_content 'Tipo: Email'
  end
end