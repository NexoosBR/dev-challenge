FactoryBot.define do
  factory :credit_request do
    company { create(:company) }
    status { 0 }
    amount { 200000 }
    periods { 24 }
    monthly_fee { 0.010 }
  end
end
