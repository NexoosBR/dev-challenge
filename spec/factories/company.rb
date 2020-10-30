FactoryBot.define do
  factory :company do
    email { FFaker::Internet.email }
    password { 'password' }
    password_confirmation { 'password' }
    name { FFaker::Name.name }
    cnpj { FFaker::IdentificationBR.cnpj }

    after(:create) do |company|
      company.confirm
    end
  end
end