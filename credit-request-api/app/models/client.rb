class Client < ActiveRecord::Base
  has_many :addresses
  has_many :phones
  has_many :credits

  accepts_nested_attributes_for :addresses, allow_destroy: true
  accepts_nested_attributes_for :phones, allow_destroy: true

  validates :name, :cnpj, presence: true
end
