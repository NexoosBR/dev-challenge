FactoryBot.define do
  factory :loan do
    association :client, strategy: :build
    association :credit, strategy: :build

    interest { 0.015 }
    value { Faker::Number.decimal(l_digits: 1, r_digits: 1) }
    total { (value * 2) }
    subdivision { Faker::Number.between(from: 1, to: 12) }

    trait :with_installments do
      after :create do |loan|
        loan.subdivision.times.each do
          create(:installment, loan: loan)
        end
      end
    end
  end
end
