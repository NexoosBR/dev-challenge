FactoryBot.define do
  factory :phone do
    number  { '11966554545' }
    company { create(:company) }
  end
end
