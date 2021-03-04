require 'rails_helper'

RSpec.describe "loan_applications/edit", type: :view do
  before(:each) do
    @loan_application = assign(:loan_application, LoanApplication.create!(
      number_installments: "",
      interest_rate: "9.99",
      status: 1,
      loan_applicant: nil
    ))
  end

  it "renders the edit loan_application form" do
    render

    assert_select "form[action=?][method=?]", loan_application_path(@loan_application), "post" do

      assert_select "input[name=?]", "loan_application[number_installments]"

      assert_select "input[name=?]", "loan_application[interest_rate]"

      assert_select "input[name=?]", "loan_application[status]"

      assert_select "input[name=?]", "loan_application[loan_applicant_id]"
    end
  end
end
