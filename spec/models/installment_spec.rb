require 'rails_helper'

RSpec.describe Installment, type: :model do
  describe '.validates' do
    it 'success' do
      company = build(:company)
      company_profile = build(:company_profile, company: company)
      proposal = build(:proposal, company_profile: company_profile)
      installment = Installment.new(installment_index: 1, value: 5_000,
                                    expiration: 1.month.from_now,
                                    proposal: proposal)

      installment.valid?

      expect(installment.errors).to be_empty
    end

    it 'unsuccess by empty fields' do
      installment = Installment.new(installment_index: nil, value: nil,
                                    expiration: nil, proposal: nil)
      
      installment.valid?

      expect(installment.errors.full_messages).to eq([
         "Parcela não pode ficar em branco",
         "Valor não pode ficar em branco",
         "Vencimento não pode ficar em branco",
         "Proposal é obrigatório(a)"])
    end
  end
end
