class CompanyProfile < ApplicationRecord
  belongs_to :company
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :contacts, as: :contactable, dependent: :destroy
end
