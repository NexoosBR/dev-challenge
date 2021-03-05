require 'rails_helper'

RSpec.describe Telephone, type: :model do
  let(:telephone1) { create(:telephone) }

  it "Should be valid" do
    expect(telephone1).to be_valid
  end

  it "Should not be valid. area_code cannot be nil" do
    telephone2 = build(:telephone, area_code: nil)
    expect(telephone2).to_not be_valid
  end

  it "Should not be valid. phone_number cannot be nil" do
    telephone2 = build(:telephone, phone_number: nil)
    expect(telephone2).to_not be_valid
  end

  it "Should not be valid. phone_number less than 8" do
    telephone2 = build(:telephone, area_code: Faker::Number.number(digits: 7))
    expect(telephone2).to_not be_valid
  end

  it "Should not be valid. phone_number less than 9" do
    telephone2 = build(:telephone, area_code: Faker::Number.number(digits: 10))
    expect(telephone2).to_not be_valid
  end

  it "Should not be valid. loan_applicant cannot be nil" do
    telephone2 = build(:telephone, loan_applicant: nil)
    expect(telephone2).to_not be_valid
  end
end
