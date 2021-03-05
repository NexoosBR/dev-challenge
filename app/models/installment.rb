class Installment < ApplicationRecord
  validates :number, presence: true, format: { with: /[0-9]+/,
    message: "only allows numbers" }
  validates :amount, presence: true
  validates :due_at, presence: true

  belongs_to :borrowing
end
