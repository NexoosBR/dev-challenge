class Borrowing < ApplicationRecord
  validates :installment_plan, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :interest_rate, presence: true, numericality: { greater_than: 0.0 }
  validates :amount, presence: true, numericality: { greater_than: 0 }

  belongs_to :borrower
  has_many :installments

  enum status: {
    denied: 0,
    opened: 1,
    granted: 2,
    closed: 3,
    processing: 4
  }

  alias_attribute :installment_amount, :total

  after_save do |borrowing|
    InstallmentService.new(borrowing).call
  end

  before_create do
    self.status = :opened
    self.total = BorrowingService.new(self).call
  end
end
