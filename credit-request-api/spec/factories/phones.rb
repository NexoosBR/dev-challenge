FactoryBot.define do
  factory :phone do
    association :client, strategy: :build

    value { Faker::PhoneNumber.cell_phone }
  end
end
