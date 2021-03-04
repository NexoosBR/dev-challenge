require 'rails_helper'

RSpec.describe "telephones/index", type: :view do
  before(:each) do
    assign(:telephones, [
      Telephone.create!(
        area_code: "Area Code",
        phone_type: 2,
        phone_number: "Phone Number",
        loan_applicant: nil
      ),
      Telephone.create!(
        area_code: "Area Code",
        phone_type: 2,
        phone_number: "Phone Number",
        loan_applicant: nil
      )
    ])
  end

  it "renders a list of telephones" do
    render
    assert_select "tr>td", text: "Area Code".to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: "Phone Number".to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
