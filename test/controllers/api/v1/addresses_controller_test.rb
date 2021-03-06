require 'test_helper'

class Api::V1::AddressesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @applicant = Applicant.create!(
      cnpj: '16.937.698/0001-06',
      company_name: 'Nexoos'
    )
  end

  test "an applicant's address can be created" do
    address_params = {
      street: Faker::Address.street_name,
      number: Faker::Address.building_number,
      zipcode: '10101-101',
      complement: '123',
      city: Faker::Address.city,
      state: Faker::Address.state,
      country: Faker::Address.country,
      applicant_id: @applicant.id
    }

    assert_difference ['Address.count', '@applicant.addresses.count'], 1 do
      post api_v1_addresses_path, params: address_params
    end
    assert_response :created
  end
end