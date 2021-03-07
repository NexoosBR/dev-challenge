feature 'User request loan' do
  scenario 'simulate loan successfully' do
    create(:client, cnpj: '12345678000109')

    visit root_path
    click_on 'Criar uma solicitação de crédito'
    fill_in 'CNPJ', with: '12.345.678/0001-09'
    page.find('body').click
    fill_in 'Solicitação de Crédito', with: '10000000'
    fill_in 'Taxa de Juros', with: '1.50'
    fill_in 'Número de vezes', with: '12'
    click_on 'Solicitar Cotação'

    parcel_value = find_field('Preço da parcela', disabled: true).value
    expect(parcel_value).to eq('9168')
  end

  scenario 'request loan successfully' do
    create(:client, cnpj: '12345678000109')

    visit root_path
    click_on 'Criar uma solicitação de crédito'
    fill_in 'CNPJ', with: '12.345.678/0001-09'
    page.find('body').click
    fill_in 'Solicitação de Crédito', with: '10000000'
    fill_in 'Taxa de Juros', with: '1.50'
    fill_in 'Número de vezes', with: '12'
    click_on 'Solicitar Cotação'
    click_on 'Confirmar empréstimo'

    expect(page).to have_content('Empréstimo confirmado!')
  end
end
