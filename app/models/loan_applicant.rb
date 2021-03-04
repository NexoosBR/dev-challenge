class LoanApplicant < ApplicationRecord
  validates :company_name, presence: true, uniqueness: true
  validates :company_number, presence: true, uniqueness: true, 
  format: { with: /\A[0-9]+\z/,
    message: "only allows numbers" }, length: { is: 14 }

  has_many :addresses
end
