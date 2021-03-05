FactoryBot.define do
  factory :installment do
    number { Faker::Number.within(range: 1..24) }
    amount { Faker::Number.within(range: 1.0..2000.0) }
    due_at { DateTime.now }
    borrowing
  end
end
