require 'rails_helper'

RSpec.describe Installment, type: :model do
  let(:installment1) { create(:installment) }

  it "Should be valid" do
    expect(installment1).to be_valid
  end

  it "Should not be valid, installment_value is nil" do
    installment2 = build(:installment, installment_value: nil)
    expect(installment2).to_not be_valid
  end

  it "Should not be valid, due_at is nil" do
    installment2 = build(:installment, due_at: nil)
    expect(installment2).to_not be_valid
  end

  it "Should not be valid, loan_application is nil" do
    installment2 = build(:installment, loan_application: nil)
    expect(installment2).to_not be_valid
  end
end
