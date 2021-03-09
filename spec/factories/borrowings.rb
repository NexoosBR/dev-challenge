FactoryBot.define do
  factory :borrowing do
    installment_plan { Faker::Number.within(range: 1..24) }
    interest_rate { Faker::Number.within(range: 0.1..10.0) }
    amount { Faker::Number.within(range: 100.0..500.0) }
    total { Faker::Number.within(range: 500.1..800.0) }
    borrower
  end
end
