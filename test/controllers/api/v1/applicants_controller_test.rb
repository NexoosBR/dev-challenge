require 'test_helper'

class Api::V1::ApplicantsControllerTest < ActionDispatch::IntegrationTest
  test 'applicant can be created' do
    applicant_params = {
      cnpj: Faker::Company.brazilian_company_number,
      company_name: Faker::Company.name
    }

    assert_difference 'Applicant.count', 1 do
      post api_v1_applicants_path, params: applicant_params
    end
    assert_response :created
  end
end
