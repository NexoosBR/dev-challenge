require 'test_helper'

class Api::V1::PhonesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @applicant = Applicant.create!(
      cnpj: '16.937.698/0001-06',
      company_name: 'Nexoos'
    )
  end

  test "an applicant's phone can be created" do
    phone_params = {
      number: Faker::PhoneNumber.cell_phone_in_e164,
      applicant_id: @applicant.id
    }

    assert_difference ['Phone.count', '@applicant.phones.count'], 1 do
      post api_v1_phones_path, params: phone_params
    end
    assert_response :created
  end
end
