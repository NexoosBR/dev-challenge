feature 'User request credit' do
  scenario 'successfully' do
    create(:client, cnpj: '12.345.678/0001-09')

    visit root_path
    fill_in 'CNPJ', with: '12.345.678/0001-09'
    fill_in 'Solicitação de Crédito', with: '2000'
    click_on 'Solicitar Crédito'

    expect(page).to have_content('Crédito Aprovado')
  end
end
