FactoryBot.define do
  factory :phone_number do
    number { '11111-1111' }
    company { create(:company) }
  end
end
