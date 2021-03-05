FactoryBot.define do
  factory :borrower do
    company_name { Faker::Company.name }
    company_number { Faker::Company.brazilian_company_number }
  end
end