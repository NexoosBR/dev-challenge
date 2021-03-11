require 'rails_helper'

RSpec.describe Borrowing, type: :model do
  let(:borrowing1) { create(:borrowing) }

  it "Should be valid" do
    expect(borrowing1).to be_valid
  end

  it "Should be valid and create installments" do
    expect(borrowing1.installments.size).to eql(borrowing1.installment_plan)
  end

  it "Should not be valid, installment_plan is nil" do
    borrowing2 = build(:borrowing, installment_plan: nil)
    expect(borrowing2).to_not be_valid
  end

  it "Should not be valid. installment_plan is less than 1" do
    expect { create(:borrowing, installment_plan: 0) }.to raise_error(/Parcelas deve ser maior que 0/)
  end

  it "Should not be valid, interest_rate is nil" do
    borrowing2 = build(:borrowing, interest_rate: nil)
    expect(borrowing2).to_not be_valid
  end

  it "Should not be valid. interest_rate is less than 0" do
    expect { create(:borrowing, interest_rate: -1) }.to raise_error(/Taxa de Juros deve ser maior que 0.0/)
  end

  it "Should not be valid, amount is nil" do
    borrowing2 = build(:borrowing, amount: nil)
    expect(borrowing2).to_not be_valid
  end

  it "Should not be valid. amount is less than 1" do
    expect { create(:borrowing, amount: 0) }.to raise_error(/Valor Solicitado deve ser maior que 0/)
  end

  it "Should not be valid, borrower is nil" do
    installment2 = build(:borrowing, borrower: nil)
    expect(installment2).to_not be_valid
  end
end
