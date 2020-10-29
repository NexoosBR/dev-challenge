FactoryBot.define do
  factory :company_profile do
    company
    name { 'Nexoos' }
    document { '12345668974' }
  end
end