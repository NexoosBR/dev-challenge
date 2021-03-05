require 'rails_helper'

RSpec.describe LoanApplication, type: :model do
  let(:loan_application1) { create(:loan_application) }

  it "Should be valid" do
    expect(loan_application1).to be_valid
  end

  it "Should not be valid, installments is nil" do
    loan_application2 = build(:loan_application, number_installments: nil)
    expect(loan_application2).to_not be_valid
  end

  it "Should not be valid, interest_rate is nil" do
    loan_application2 = build(:loan_application, interest_rate: nil)
    expect(loan_application2).to_not be_valid
  end

  it "Should not be valid, loan_applicant is nil" do
    installment2 = build(:loan_application, loan_applicant: nil)
    expect(installment2).to_not be_valid
  end
end
