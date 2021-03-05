FactoryBot.define do
  factory :address do
    association :client, strategy: :build

    value { Faker::Address.street_address }
  end
end
