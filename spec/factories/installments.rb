FactoryBot.define do
  factory :installment do
    installment_value { Faker::Number.within(range: 1.0..2000.0) }
    due_at { DateTime.now }
    loan_application
  end
end
