require 'rails_helper'

RSpec.describe Borrowing, type: :model do
  let(:borrowing1) { create(:borrowing) }

  it "Should be valid" do
    expect(borrowing1).to be_valid
  end

  it "Should not be valid, installment_plan is nil" do
    borrowing2 = build(:borrowing, installment_plan: nil)
    expect(borrowing2).to_not be_valid
  end

  it "Should not be valid, interest_rate is nil" do
    borrowing2 = build(:borrowing, interest_rate: nil)
    expect(borrowing2).to_not be_valid
  end

  it "Should not be valid, amount is nil" do
    borrowing2 = build(:borrowing, amount: nil)
    expect(borrowing2).to_not be_valid
  end

  it "Should not be valid, total is nil" do
    borrowing2 = build(:borrowing, total: nil)
    expect(borrowing2).to_not be_valid
  end

  it "Should not be valid, borrower is nil" do
    installment2 = build(:borrowing, borrower: nil)
    expect(installment2).to_not be_valid
  end
end
