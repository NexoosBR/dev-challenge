FactoryBot.define do
  factory :address do
    country { FFaker::Address.country }
    state { 'State' }
    city { FFaker::Address.city }
    neighborhood { FFaker::Address.neighborhood }
    street { 'Rua do bobo' }
    number { '0' }
    zipcode { '00000-000' }
    company { create(:company) }
  end
end
