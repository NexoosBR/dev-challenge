class LoanRequest < ApplicationRecord
  belongs_to :applicant
  has_many :loans
end
