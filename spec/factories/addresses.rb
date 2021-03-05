FactoryBot.define do
  factory :address do
    address { Faker::Address.full_address }
    neighborhood { Faker::Address.community }
    city { Faker::Address.city }
    fed_unit { 0 }
    zipcode { Faker::Address.zip_code }
    borrower
  end
end
