class Installment < ApplicationRecord
  validates :installment_index, :value, :expiration, presence: true
  belongs_to :proposal
  enum status: {pending: 0, paid: 5}
end
