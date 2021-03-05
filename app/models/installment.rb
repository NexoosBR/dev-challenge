class Installment < ApplicationRecord
  validates :installment_value, presence: true
  validates :due_at, presence: true

  belongs_to :loan_application
end
