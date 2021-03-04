FactoryBot.define do
  factory :telephone do
    area_code { Faker::Number.number(digits: 2) }
    phone_type { 0 }
    phone_number { Faker::Number.number(digits: 8) }
    loan_applicant
  end
end
