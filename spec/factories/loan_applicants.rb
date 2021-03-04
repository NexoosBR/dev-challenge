FactoryBot.define do
  factory :loan_applicant do
    company_name { Faker::Company.name }
    company_number { Faker::Company.brazilian_company_number }
  end
end