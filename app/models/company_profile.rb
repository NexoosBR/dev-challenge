class CompanyProfile < ApplicationRecord
  validates :name, :document, presence: true
  belongs_to :company
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :contacts, as: :contactable, dependent: :destroy
  has_many :proposals
  accepts_nested_attributes_for :addresses
  accepts_nested_attributes_for :contacts
end
