require 'test_helper'

class Api::V1::LoanRequestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @applicant = Applicant.create!(
      cnpj: '16.937.698/0001-06',
      company_name: 'Nexoos'
    )
  end

  test 'an applicant can create a loan request' do
    loan_request_params = {
      applicant_id: @applicant.id,
      value: Faker::Number.decimal(l_digits: 8, r_digits: 2)
    }

    assert_difference ['LoanRequest.count', '@applicant.loan_requests.count'], 1 do
      post api_v1_loan_requests_path, params: loan_request_params
    end
    assert_response :created
  end
end
