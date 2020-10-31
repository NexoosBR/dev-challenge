FactoryBot.define do
  factory :installment do
    value { '' }
    due_date { '' }
    company { create(:company) }
    loan { create(:loan) }
  end
end
