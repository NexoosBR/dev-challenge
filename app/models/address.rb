class Address < ApplicationRecord
  belongs_to :company

  validates :street, presence: true
  validates :number, presence: true
end
