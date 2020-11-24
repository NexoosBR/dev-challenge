FactoryBot.define do
  factory :address do
    street  { 'Rua das Ostras' }
    number  { '11' }
    company { create(:company) }
  end
end
