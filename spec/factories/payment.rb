FactoryBot.define do
  factory :payment do
    amount         { 9167.999290622945 }
    credit_request { create(:credit_request) }
    status { 0 }
    due_date { Date.current }
  end
end
