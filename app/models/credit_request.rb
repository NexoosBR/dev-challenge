class CreditRequest < ApplicationRecord
  has_many :payments
  belongs_to :company

  enum status: [ :awaiting_approval, :approved, :denied ]
end
