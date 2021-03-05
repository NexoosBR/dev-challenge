require 'rails_helper'

RSpec.describe Phone, type: :model do
  let(:phone1) { create(:phone) }

  it "Should be valid" do
    expect(phone1).to be_valid
  end

  it "Should not be valid. area_code cannot be nil" do
    phone2 = build(:phone, area_code: nil)
    expect(phone2).to_not be_valid
  end

  it "Should not be valid. phone_number cannot be nil" do
    phone2 = build(:phone, phone_number: nil)
    expect(phone2).to_not be_valid
  end

  it "Should not be valid. phone_number less than 8" do
    phone2 = build(:phone, area_code: Faker::Number.number(digits: 7))
    expect(phone2).to_not be_valid
  end

  it "Should not be valid. phone_number less than 9" do
    phone2 = build(:phone, area_code: Faker::Number.number(digits: 10))
    expect(phone2).to_not be_valid
  end

  it "Should not be valid. borrower cannot be nil" do
    phone2 = build(:phone, borrower: nil)
    expect(phone2).to_not be_valid
  end
end
