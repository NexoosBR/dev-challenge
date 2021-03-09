require 'rails_helper'

RSpec.describe Borrower, type: :model do
  let(:borrower1) { create(:borrower) }

  it "Should be valid" do
    expect(borrower1).to be_valid
  end

  it "Should not be valid, company_name is nil" do
    borrower2 = build(:borrower, company_name: nil)
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, company_name exists" do
    borrower2 = build(:borrower, company_name: borrower1.company_name)
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, company_number is nil" do
    borrower2 = build(:borrower, company_number: nil)
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, company_number exists" do
    borrower2 = build(:borrower, company_number: borrower1.company_number)
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, number of characters exceeds that allowed" do
    borrower2 = build(:borrower, company_number: Faker::Number.number(digits: 15))
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, number of characters is less than necessary" do
    borrower2 = build(:borrower, company_number: Faker::Number.number(digits: 13))
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, invalid characters" do
    borrower2 = build(:borrower, company_number: Faker::Company.brazilian_company_number(formatted: true))
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, company_phone is nil" do
    borrower2 = build(:borrower, company_phone: nil)
    expect(borrower2).to_not be_valid
  end

  it "Should not be valid, owner_phone is nil" do
    borrower2 = build(:borrower, owner_phone: nil)
    expect(borrower2).to_not be_valid
  end
end
