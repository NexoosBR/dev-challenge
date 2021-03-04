require 'rails_helper'

RSpec.describe "loan_applications/show", type: :view do
  before(:each) do
    @loan_application = assign(:loan_application, LoanApplication.create!(
      number_installments: "",
      interest_rate: "9.99",
      status: 2,
      loan_applicant: nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(/9.99/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(//)
  end
end
