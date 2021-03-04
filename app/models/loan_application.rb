class LoanApplication < ApplicationRecord
  validates :number_installments, presence: true
  validates :interest_rate, presence: true

  belongs_to :loan_applicant
  
end
