require 'rails_helper'

feature 'Visit home page' do
  scenario 'successfully' do
    visit root_path

    expect(page).to have_content('Bem vindo!')
  end
end