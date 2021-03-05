FactoryBot.define do
  factory :phone do
    area_code { Faker::Number.number(digits: 2) }
    phone_type { 0 }
    phone_number { Faker::Number.number(digits: 8) }
    borrower
  end
end
