class CreditBorrow < ApplicationRecord
  validates :amount, presence: true
  validates :status, presence: true

  belongs_to :borrower

  enum status: {
    denied: 0,
    opened: 1,
    granted: 2,
    closed: 3,
    processing: 4
  }

  before_validation do |credit_borrow|
    credit_borrow.status = :opened
  end
end
