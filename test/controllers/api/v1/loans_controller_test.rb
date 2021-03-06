require 'test_helper'

class Api::V1::LoansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @applicant = Applicant.create!(
      cnpj: '16.937.698/0001-06',
      company_name: 'Nexoos'
    )
    @loan_request = @applicant.loan_requests.create(
      value: Faker::Number.decimal(l_digits: 6, r_digits: 2)
    )
  end

  test 'can create a loan through a loan request, generating installments' do
    loan_params = {
      loan_request_id: @loan_request.id,
      interest: Faker::Number.decimal(l_digits: 2, r_digits: 2),
      installment_count: Faker::Number.number(digits: 2)
    }

    assert_difference ['Loan.count', '@applicant.loans.count', '@loan_request.loans.count'], 1 do
      post api_v1_loans_path, params: loan_params
    end
    assert_response :created

    loan = Loan.last
    pmt = @loan_request.value * ((((1 + loan_params[:interest]) ** loan_params[:installment_count]) * loan_params[:interest]) / (((1 + loan_params[:interest]) ** loan_params[:installment_count]) - 1))
    assert loan.installments.count == loan_params[:installment_count]
    assert loan.installments.first.value = pmt
  end
end
