class Company < ApplicationRecord
  has_many :phones
  has_many :addresses
  has_many :credit_requests

  validates :name, presence: true
  validates :cnpj, presence: true
end
