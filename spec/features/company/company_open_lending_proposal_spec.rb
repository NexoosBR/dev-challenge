require 'rails_helper'

feature 'Company open lending proposal' do
  scenario 'successfully' do
    company = create(:company, email: 'nexoos@nexoos.com')
    create(:company_profile, name: 'Nexoos', company: company)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Solicitação de Crédito'
    fill_in 'Valor', with: 100_000
    fill_in 'Parcelas', with: 12
    fill_in 'Vencimento', with: '15/12/2020'
    click_on 'Enviar'

    expect(page).to have_content 'Proposta enviada com sucesso!'
    expect(page).to have_content 'Valor: R$ 100.000,00'
    expect(page).to have_content 'Parcelas: 12'
    expect(page).to have_content 'Vencimento: 15/12/2020'
  end

  scenario 'and need to sign in' do
    visit root_path
    click_on 'Solicitação de Crédito'

    expect(page).to have_content 'Para continuar, faça login ou registre-se.'
  end

  scenario 'and need to create a profile' do
    company = create(:company, email: 'nexoos@nexoos.com')

    login_as(company, scope: :company)
    visit root_path
    click_on 'Solicitação de Crédito'

    expect(page).to have_content 'Antes de realizar uma solicitação, preencha '\
                                 'seu perfil.'
    expect(page).to have_css('h1', text: 'Preencha seu Perfil')
  end
  
  scenario 'and successfully see all installments' do
    company = create(:company, email: 'nexoos@nexoos.com')
    create(:company_profile, name: 'Nexoos', company: company)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Solicitação de Crédito'
    fill_in 'Valor', with: 5_000
    fill_in 'Parcelas', with: 3
    fill_in 'Vencimento', with: '15/12/2020'
    click_on 'Enviar'

    expect(page).to have_content 'Proposta enviada com sucesso!'
    expect(page).to have_content 'Valor: R$ 5.000,00'
    expect(page).to have_css('th', text: 'Parcela Nº')
    expect(page).to have_css('tr', text: '1')
    expect(page).to have_css('th', text: 'Valor')
    expect(page).to have_css('tr', text: 'R$ 1.717,00')
    expect(page).to have_css('th', text: 'Data de Vencimento')
    expect(page).to have_css('tr', text: '15/12/2020')
    expect(page).to have_css('th', text: 'Status')
    expect(page).to have_css('tr', text: 'Pendente')
    expect(page).to have_content '2 R$ 1.717,00 15/01/2021 Pendente' # Forma que o capybara le as linhas da tabela de parcelas
    expect(page).to have_content '3 R$ 1.717,00 15/02/2021 Pendente'
  end

  scenario 'and must fill all fields' do
    company = create(:company, email: 'nexoos@nexoos.com')
    create(:company_profile, name: 'Nexoos', company: company)

    login_as(company, scope: :company)
    visit root_path
    click_on 'Solicitação de Crédito'
    fill_in 'Valor', with: ''
    fill_in 'Parcelas', with: 12
    fill_in 'Vencimento', with: '15/12/2020'
    click_on 'Enviar'

    expect(page).to have_content 'Valor não pode ficar em branco'    
  end
end