class CreditRequest < ApplicationRecord
  has_many :payments
  belongs_to :company

  before_create do
    self.status = 0
  end

end
