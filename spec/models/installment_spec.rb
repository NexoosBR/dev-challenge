require 'rails_helper'

RSpec.describe Installment, type: :model do
  let!(:company) { create(:company) }
  let(:loan) { create(:loan, company: company) }
  let(:installment) { Installment.first }

  context 'validates loan' do
    it 'should loan.pmt is equal installment.value is valid' do
      expect(loan.pmt).to eq(installment.value)
    end

    it 'should loan.number_installments equal to installment quantity' do
      expect(loan.number_installments).to eq(Installment.count)
    end
  end
end
