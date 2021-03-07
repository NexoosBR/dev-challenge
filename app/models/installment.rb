class Installment < ApplicationRecord
  belongs_to :credit

  enum status: { pending: 0, overdue: 10, paid: 20 }
end
