require 'rails_helper'

RSpec.describe "loan_applications/index", type: :view do
  before(:each) do
    assign(:loan_applications, [
      LoanApplication.create!(
        number_installments: "",
        interest_rate: "9.99",
        status: 2,
        loan_applicant: nil
      ),
      LoanApplication.create!(
        number_installments: "",
        interest_rate: "9.99",
        status: 2,
        loan_applicant: nil
      )
    ])
  end

  it "renders a list of loan_applications" do
    render
    assert_select "tr>td", text: "".to_s, count: 2
    assert_select "tr>td", text: "9.99".to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
