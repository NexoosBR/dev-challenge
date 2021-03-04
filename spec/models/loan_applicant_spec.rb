require 'rails_helper'

RSpec.describe LoanApplicant, type: :model do
  let(:loan_applicant1) { create(:loan_applicant) }

  it "Should be valid" do
    expect(loan_applicant1).to be_valid
  end

  it "Should not be valid, company_name is nil" do
    loan_applicant2 = build(:loan_applicant, company_name: nil)
    expect(loan_applicant2).to_not be_valid
  end

  it "Should not be valid, company_name exists" do
    loan_applicant2 = build(:loan_applicant, company_name: loan_applicant1.company_name)
    expect(loan_applicant2).to_not be_valid
  end

  it "Should not be valid, company_number is nil" do
    loan_applicant2 = build(:loan_applicant, company_number: nil)
    expect(loan_applicant2).to_not be_valid
  end

  it "Should not be valid, company_number exists" do
    loan_applicant2 = build(:loan_applicant, company_number: loan_applicant1.company_number)
    expect(loan_applicant2).to_not be_valid
  end

  it "Should not be valid, number of characters exceeds that allowed" do
    loan_applicant2 = build(:loan_applicant, company_number: Faker::Number.number(digits: 15))
    expect(loan_applicant2).to_not be_valid
  end

  it "Should not be valid, number of characters is less than necessary" do
    loan_applicant2 = build(:loan_applicant, company_number: Faker::Number.number(digits: 13))
    expect(loan_applicant2).to_not be_valid
  end

  it "Should not be valid, invalid characters" do
    loan_applicant2 = build(:loan_applicant, company_number: Faker::Company.brazilian_company_number(formatted: true))
    expect(loan_applicant2).to_not be_valid
  end
end
