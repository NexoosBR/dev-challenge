require 'rails_helper'

RSpec.describe "loan_applicants/show", type: :view do
  before(:each) do
    @loan_applicant = assign(:loan_applicant, LoanApplicant.create!(
      company_name: Faker::Company.name,
      company_number: Faker::Company.brazilian_company_number
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Company name/)
    expect(rendered).to match(/Company number/)
  end
end
