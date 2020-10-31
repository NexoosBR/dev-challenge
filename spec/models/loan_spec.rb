require 'rails_helper'

RSpec.describe Loan, type: :model do
  let!(:company) { create(:company) }
  let(:loan) { create(:loan, company: company) }

  context 'validates loan' do
    it 'should loan is valid' do
      expect(loan).to be_valid
    end

    it 'is not valid without value' do
      loan.update(value: nil)
      loan.reload
      expect(loan.value).to_not be_nil
    end

    it 'is not valid without number installments' do
      loan.update(number_installments: nil)
      loan.reload
      expect(loan.number_installments).to_not be_nil
    end
  end
end
