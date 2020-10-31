FactoryBot.define do
  factory :loan do
    value { "9.99" }
    rate { "9.99" }
    number_installments { 1 }
    company { nil }
  end
end
