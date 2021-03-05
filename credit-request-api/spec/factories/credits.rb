FactoryBot.define do
  factory :credit do
    association :client, strategy: :build

    value { Faker::Number.decimal(l_digits: 2, r_digits: 5) }
    remain { value - 0.1 }
  end
end
