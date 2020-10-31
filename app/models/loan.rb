class Loan < ApplicationRecord
  belongs_to :company
  has_many :installments

  before_create do
    self.rate ||= 0.015
  end
end
