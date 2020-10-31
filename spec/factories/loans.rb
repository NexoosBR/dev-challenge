FactoryBot.define do
  factory :loan do
    value { FFaker.numerify("#.##") }
    rate { FFaker.numerify("#.##") }
    number_installments { 12 }
    company { create(:company) }
  end
end
