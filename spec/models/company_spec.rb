require 'rails_helper'

RSpec.describe Company, type: :model do
  let!(:company) { create(:company) }

  it 'is valid with email, password, full name and role' do
    expect(company).to be_valid
  end

  context 'Validates' do
    it 'is not valid without email' do
      company = build(:company, email: nil)
      company.valid?
      expect(company).to be_invalid
    end

    it 'is not valid without password' do
      company = build(:company, password: nil)
      company.valid?
      expect(company).to be_invalid
    end

    it 'is not valid with wrong password confirmation' do
      company = build(:company, password_confirmation: Devise.friendly_token.first(6))
      company.valid?
      expect(company).to be_invalid
    end

    it 'is not valid without name' do
      company = build(:company, name: nil)
      company.valid?
      expect(company).to be_invalid
    end
  end
end
