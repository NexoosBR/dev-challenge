FactoryBot.define do
  factory :proposal do
    value { 5_000 }
    installments { 3 }
    tax { 0.015 }
    expiration { 1.month.from_now }
    company_profile
  end
end