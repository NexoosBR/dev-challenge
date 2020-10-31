require 'rails_helper'

RSpec.describe Proposal, type: :model do
  describe '.value_valid?' do
    it 'is valid' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 50_000,
                              installments: 3, tax: 0.015,
                              expiration: 3.months.from_now)
      proposal.valid?

      expect(proposal.errors).to be_empty
    end

    it 'invalid if value minor than range' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 4_999,
                              installments: 3, tax: 0.015,
                              expiration: 3.months.from_now)
      proposal.valid?

      expect(proposal.errors.full_messages).
        to eq ['Valor precisa estar entre R$ 5.000,00 e R$ 200.000,00']
    end

    it 'invalid if value bigger than range' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 200_001,
                              installments: 3, tax: 0.015,
                              expiration: 3.months.from_now)
      proposal.valid?

      expect(proposal.errors.full_messages).
        to eq ['Valor precisa estar entre R$ 5.000,00 e R$ 200.000,00']
    end
  end

  describe '.validates :installments' do
    it 'is valid' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 50_000,
                              installments: 3, tax: 0.015,
                              expiration: 3.months.from_now)
      proposal.valid?

      expect(proposal.errors.full_messages).to be_empty
    end

    it 'invalid if minor than range' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 5_000,
                              installments: 2, tax: 0.015,
                              expiration: 3.months.from_now)
      proposal.valid?

      expect(proposal.errors.full_messages).
        to eq ['Parcelas deve ser maior ou igual a 3']
    end

    it 'invalid if bigger than range' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 50_000,
                              installments: 61, tax: 0.015,
                              expiration: 3.months.from_now)
      proposal.valid?

      expect(proposal.errors.full_messages).
        to eq ['Parcelas deve ser menor ou igual a 60']
    end
  end

  describe '.expiration_date_valid?' do
    it 'is valid' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 5_000,
                              installments: 3, tax: 0.015,
                              expiration: 3.months.from_now)
      
      proposal.valid?

      expect(proposal.errors).to be_empty
    end

    it 'invalid if less than a month from submit date' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile, value: 5_000,
                              installments: 3, tax: 0.015,
                              expiration: 15.days.from_now)
      
      proposal.valid?

      expect(proposal.errors.full_messages).
        to eq ['Vencimento precisa ser entre '\
               "#{I18n.l(1.months.from_now, format: :long)} e "\
               "#{I18n.l(6.months.from_now, format: :long)}"]      
    end


    it 'invalid if more than 6 months from submit date' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = Proposal.new(company_profile: company_profile,value: 5_000,
                              installments: 3, tax: 0.015,
                              expiration: 8.months.from_now)
      
      proposal.valid?

      expect(proposal.errors.full_messages).
        to eq ['Vencimento precisa ser entre '\
               "#{I18n.l(1.months.from_now, format: :long)} e "\
               "#{I18n.l(6.months.from_now, format: :long)}"]      
    end
  end
end
