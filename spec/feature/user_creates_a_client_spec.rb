feature 'User creates a new client' do
  scenario 'successfully' do
    visit root_path
    click_on 'Cadastrar um cliente'
    fill_in 'Razão Social', with: 'Coca Cola LTDA.'
    fill_in 'CNPJ', with: '12.345.678/0001-09'
    fill_in 'CEP', with: '08275-090'
    fill_in 'Número', with: '500'
    fill_in 'Complemento', with: 'Casa 2'
    fill_in 'Telefone', with: '(11) 91234-4321'
    find_field('Estado', disabled: true, with: 'SP')
    click_on 'Cadastrar'

    expect(page).to have_content('Participante cadastrado com sucesso')
    expect(Client.last.name).to eq('Coca Cola LTDA.')
    expect(Client.last.cnpj).to eq('12345678000109')
    expect(Client.last.phones.first).to eq('11912344321')

    first_address = Client.last.addresses.first
    expect(first_address.cep).to eq('08275090')
    expect(first_address.number).to eq('500')
    expect(first_address.complement).to eq('Casa 2')
  end
end
