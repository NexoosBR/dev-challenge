require 'rails_helper'

RSpec.describe CreditBorrow, type: :model do
  let(:credit_borrow1) { create(:credit_borrow) }

  it "Should be valid" do
    expect(credit_borrow1).to be_valid
  end

  it "Should not be valid, amount is nil" do
    credit_borrow2 = build(:credit_borrow, amount: nil)
    expect(credit_borrow2).to_not be_valid
  end

  it "Should not be valid, borrower is nil" do
    installment2 = build(:credit_borrow, borrower: nil)
    expect(installment2).to_not be_valid
  end
end
