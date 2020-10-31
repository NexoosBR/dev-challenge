class Loan < ApplicationRecord
  belongs_to :company
  has_many :installments

  validates :value, :number_installments, presence: true

  before_create do
    self.rate ||= 0.015
  end
end
