class Borrowing < ApplicationRecord
  validates :installment_plan, presence: true
  validates :interest_rate, presence: true
  validates :amount, presence: true
  validates :total, presence: true

  belongs_to :borrower

  enum status: {
    DENIED: 0,
    OPENED: 1,
    GRANTED: 2,
    CLOSED: 3
  }
end
