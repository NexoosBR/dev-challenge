class Installment < ApplicationRecord
  belongs_to :company
  belongs_to :loan
end
