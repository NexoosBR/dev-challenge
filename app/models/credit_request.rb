class CreditRequest < ApplicationRecord
  has_many :payments
  belongs_to :company

  enum status: [ :awaiting_approval, :approved, :denied ]

  before_create do
    self.status = 0
  end

  def approve
    approved!
  end

  def deny
    denied!
  end
end
