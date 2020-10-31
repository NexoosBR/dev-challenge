class Loan < ApplicationRecord
  belongs_to :company

  before_create do
    self.rate ||= 0.015
  end
end
