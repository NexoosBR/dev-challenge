FactoryBot.define do
  factory :loan_application do
    number_installments { Faker::Number.within(range: 1..24) }
    interest_rate { Faker::Number.within(range: 0.1..10.0) }
    status { 0 }
    loan_applicant
  end
end
