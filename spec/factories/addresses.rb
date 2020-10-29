FactoryBot.define do
  factory :address do
    address { 'Avenida Paulista, 1000 - Bela Vista' }
    city { 'São Paulo' }
    country { 'Brasil' }
    zipcode { '00000-000' }
    state { 'SP' }
    addressable { company_profile }
  end
end