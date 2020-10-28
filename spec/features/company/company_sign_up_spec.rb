require 'rails_helper'

feature 'company sign up' do
  scenario 'successfully' do
    visit root_path
    click_on 'Login'
    click_on 'Inscrever-se'

    fill_in 'E-mail', with: 'company@email.com'
    fill_in 'Senha', with: 'company1234'
    fill_in 'Confirme sua senha', with: 'company1234'
    click_on 'Inscrever-se'

    expect(page).to have_content 'Bem vindo! Você realizou seu registro com '\
                                 'sucesso.'
  end
end
