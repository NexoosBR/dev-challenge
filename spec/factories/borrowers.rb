FactoryBot.define do
  factory :borrower do
    company_name { Faker::Company.name }
    company_number { Faker::Company.brazilian_company_number }
    company_phone { Faker::Number.number(digits: 11) }
    owner_phone { Faker::Number.number(digits: 11) }
  end
end