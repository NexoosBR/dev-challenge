FactoryBot.define do
  factory :installment do
    association :loan, strategy: :build

    payday { Faker::Date.between(from: Date.tomorrow, to: 1.year.from_now) }
    value { Faker::Number.decimal(l_digits: 1, r_digits: 1) }
  end
end
