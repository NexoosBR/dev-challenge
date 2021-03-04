require 'rails_helper'

RSpec.describe "loan_applications/new", type: :view do
  before(:each) do
    assign(:loan_application, LoanApplication.new(
      number_installments: "",
      interest_rate: "9.99",
      status: 1,
      loan_applicant: nil
    ))
  end

  it "renders new loan_application form" do
    render

    assert_select "form[action=?][method=?]", loan_applications_path, "post" do

      assert_select "input[name=?]", "loan_application[number_installments]"

      assert_select "input[name=?]", "loan_application[interest_rate]"

      assert_select "input[name=?]", "loan_application[status]"

      assert_select "input[name=?]", "loan_application[loan_applicant_id]"
    end
  end
end
