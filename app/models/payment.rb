class Payment < ApplicationRecord
  belongs_to :credit_request

  enum status: [ :pending, :paid, :late ]
end
