FactoryBot.define do
  factory :contact do
    contact { '11 99999-9999' }
    contact_type { 0 } # enum for phone 
    contactable { company_profile }
  end
end