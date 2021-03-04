require 'rails_helper'

RSpec.describe "loan_applicants/index", type: :view do
  before(:all) do
    assign(:loan_applicants, [
      LoanApplicant.create!(
        company_name: "Foo",
        company_number: "12345678901234"
      ),
      LoanApplicant.create!(
        company_name: "Bar",
        company_number: "09876543211234"
      )
    ])
  end

  it "renders a list of loan_applicants" do
    render
    assert_select "tr>th", text: "Company name".to_s, count: 1
    assert_select "tr>th", text: "Company number".to_s, count: 1

    assert_select "tr>td", text: "Foo".to_s, count: 1
    assert_select "tr>td", text: "12345678901234".to_s, count: 1

    assert_select "tr>td", text: "Bar".to_s, count: 1
    assert_select "tr>td", text: "09876543211234".to_s, count: 1
  end
end
