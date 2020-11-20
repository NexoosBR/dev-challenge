class CreditRequest < ApplicationRecord
  has_many :payments
  belongs_to :company
end
