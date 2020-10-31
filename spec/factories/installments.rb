FactoryBot.define do
  factory :installment do
    value { "9.99" }
    due_date { "2020-10-31" }
    company { nil }
    loan { nil }
  end
end
