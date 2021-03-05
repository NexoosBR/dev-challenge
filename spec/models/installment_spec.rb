require 'rails_helper'

RSpec.describe Installment, type: :model do
  let(:installment1) { create(:installment) }

  it "Should be valid" do
    expect(installment1).to be_valid
  end

  it "Should not be valid, number is nil" do
    installment2 = build(:installment, number: nil)
    expect(installment2).to_not be_valid
  end

  it "Should not be valid, amount is nil" do
    installment2 = build(:installment, amount: nil)
    expect(installment2).to_not be_valid
  end

  it "Should not be valid, due_at is nil" do
    installment2 = build(:installment, due_at: nil)
    expect(installment2).to_not be_valid
  end

  it "Should not be valid, borrowing is nil" do
    installment2 = build(:installment, borrowing: nil)
    expect(installment2).to_not be_valid
  end
end
