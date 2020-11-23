class Payment < ApplicationRecord
  belongs_to :credit_request

  enum status: [ :charged, :paid, :late ]
end
