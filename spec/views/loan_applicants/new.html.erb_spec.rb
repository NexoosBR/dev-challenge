require 'rails_helper'

RSpec.describe "loan_applicants/new", type: :view do
  before(:each) do
    assign(:loan_applicant, LoanApplicant.new(
      company_name: Faker::Company.name,
      company_number: Faker::Company.brazilian_company_number
    ))
  end

  it "renders new loan_applicant form" do
    render

    assert_select "form[action=?][method=?]", loan_applicants_path, "post" do

      assert_select "input[name=?]", "loan_applicant[company_name]"

      assert_select "input[name=?]", "loan_applicant[company_number]"
    end
  end
end
