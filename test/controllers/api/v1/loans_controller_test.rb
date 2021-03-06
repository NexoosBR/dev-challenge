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

  test 'can create a loan through a loan request' do
    loan_params = {
      loan_request_id: @loan_request.id,
      interest: Faker::Number.decimal(l_digits: 2, r_digits: 2),
      installments: Faker::Number.number(digits: 2)
    }

    assert_difference ['Loan.count', '@applicant.loans.count', '@loan_request.loans.count'], 1 do
      post api_v1_loans_path, params: loan_params
    end
    assert_response :created
  end
end
