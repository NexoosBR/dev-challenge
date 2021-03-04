require 'rails_helper'

RSpec.describe "telephones/show", type: :view do
  before(:each) do
    @telephone = assign(:telephone, Telephone.create!(
      area_code: "Area Code",
      phone_type: 2,
      phone_number: "Phone Number",
      loan_applicant: nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Area Code/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/Phone Number/)
    expect(rendered).to match(//)
  end
end
