require 'rails_helper'

RSpec.describe Address, type: :model do
  let(:address1) { create(:address) }

  it "Should be valid" do
    expect(address1).to be_valid
  end

  it "Should not be valid. address cannot be nil" do
    address2 = build(:address, address: nil)
    expect(address2).to_not be_valid
  end

  it "Should not be valid. neighborhood cannot be nil" do
    address2 = build(:address, neighborhood: nil)
    expect(address2).to_not be_valid
  end

  it "Should not be valid. city cannot be nil" do
    address2 = build(:address, city: nil)
    expect(address2).to_not be_valid
  end

  it "Should not be valid. zipcode cannot be nil" do
    address2 = build(:address, zipcode: nil)
    expect(address2).to_not be_valid
  end

  it "Should not be valid. loan_applicant cannot be nil" do
    address2 = build(:address, borrower: nil)
    expect(address2).to_not be_valid
  end
end
