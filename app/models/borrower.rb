class Borrower < ApplicationRecord
  validates :company_name, presence: true, uniqueness: true
  validates :company_number, presence: true, uniqueness: true, 
  format: { with: /[0-9]+/, message: "only allows numbers" }, 
  length: { is: 14, message: "company_number must be have 14 digits" }
  validates :company_phone, presence: true, format: { with: /[0-9]+/, message: "only allows numbers" },
  length: { minimum: 8, maximum: 11 }
  validates :owner_phone, presence: true, format: { with: /[0-9]+/, message: "only allows numbers" }, 
  length: { minimum: 8, maximum: 11 }

  has_many :borrowings, dependent: :destroy

  has_many :credit_borrows, dependent: :destroy
  
  has_many :addresses
  accepts_nested_attributes_for :addresses, allow_destroy: true
end
