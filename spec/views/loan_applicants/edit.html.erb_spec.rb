require 'rails_helper'

RSpec.describe "loan_applicants/edit", type: :view do
  before(:each) do
    @loan_applicant = assign(:loan_applicant, LoanApplicant.create!(
      company_name: Faker::Company.name,
      company_number: Faker::Company.brazilian_company_number
    ))
  end

  it "renders the edit loan_applicant form" do
    render

    assert_select "form[action=?][method=?]", loan_applicant_path(@loan_applicant), "post" do

      assert_select "input[name=?]", "loan_applicant[company_name]"

      assert_select "input[name=?]", "loan_applicant[company_number]"
    end
  end
end
