FactoryBot.define do
  factory :client do
    name { Faker::Company.unique.name }
    cnpj { Faker::Company.duns_number }
  end
end
