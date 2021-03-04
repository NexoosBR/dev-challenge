class Client < ApplicationRecord
  has_many :addresses, dependent: :destroy
  accepts_nested_attributes_for :addresses
  validates :name, presence: true
  validates :cnpj, length: { is: 14 }
end
