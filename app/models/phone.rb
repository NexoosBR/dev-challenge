class Phone < ApplicationRecord
  belongs_to :company

  validates :number, presence: true
end
