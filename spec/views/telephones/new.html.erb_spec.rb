require 'rails_helper'

RSpec.describe "telephones/new", type: :view do
  before(:each) do
    assign(:telephone, Telephone.new(
      area_code: "MyString",
      phone_type: 1,
      phone_number: "MyString",
      loan_applicant: nil
    ))
  end

  it "renders new telephone form" do
    render

    assert_select "form[action=?][method=?]", telephones_path, "post" do

      assert_select "input[name=?]", "telephone[area_code]"

      assert_select "input[name=?]", "telephone[phone_type]"

      assert_select "input[name=?]", "telephone[phone_number]"

      assert_select "input[name=?]", "telephone[loan_applicant_id]"
    end
  end
end
