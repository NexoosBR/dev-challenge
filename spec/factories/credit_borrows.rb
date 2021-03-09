FactoryBot.define do
  factory :credit_borrow do
    amount { Faker::Number.within(range: 1000.0..5000.0) }
    status { 0 }
    borrower
  end
end
