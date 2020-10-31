class PhoneNumber < ApplicationRecord
  belongs_to :company

  validates :number, presence: true
end
