class Installment < ApplicationRecord
  belongs_to :proposal
  enum status: {pending: 0, paid: 5}
end
