class Borrower < ApplicationRecord
  validates :company_name, presence: true, uniqueness: true
  validates :company_number, presence: true, uniqueness: true, 
  format: { with: /[0-9]+/, message: "only allows numbers" }, 
  length: { is: 14, message: "company_number must be have 14 digits" }

  has_many :addresses, dependent: :destroy
  accepts_nested_attributes_for :addresses, allow_destroy: true

  has_many :phones, dependent: :destroy
  accepts_nested_attributes_for :phones, allow_destroy: true
end