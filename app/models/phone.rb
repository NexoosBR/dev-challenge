class Phone < ApplicationRecord
  belongs_to :company

  validates :number, presence: true
  validates_with ::Validators::PhoneSizeValidator
end
