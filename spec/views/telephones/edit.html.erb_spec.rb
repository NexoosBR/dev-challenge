require 'rails_helper'

RSpec.describe "telephones/edit", type: :view do
  before(:each) do
    @telephone = assign(:telephone, Telephone.create!(
      area_code: "MyString",
      phone_type: 1,
      phone_number: "MyString",
      loan_applicant: nil
    ))
  end

  it "renders the edit telephone form" do
    render

    assert_select "form[action=?][method=?]", telephone_path(@telephone), "post" do

      assert_select "input[name=?]", "telephone[area_code]"

      assert_select "input[name=?]", "telephone[phone_type]"

      assert_select "input[name=?]", "telephone[phone_number]"

      assert_select "input[name=?]", "telephone[loan_applicant_id]"
    end
  end
end
