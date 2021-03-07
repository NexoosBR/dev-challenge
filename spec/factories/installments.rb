FactoryBot.define do
  factory :installment do
    parcel    { 1 }
    amount    { 1 }
    status    { 1 }
    due_date  { '2021-03-04' }
    credit
  end
end
