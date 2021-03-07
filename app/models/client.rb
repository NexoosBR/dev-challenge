class Client < ApplicationRecord
  has_many :addresses, dependent: :destroy
  has_many :credits, dependent: :destroy
  has_many :installments, through: :credits

  accepts_nested_attributes_for :addresses
  validates :name, presence: true
  validates :cnpj, length: { is: 14 }

  def self.find_id_or_cnpj!(identifier)
    return Client.find(identifier) if identifier.is_a? Integer

    Client.find_by!(cnpj: identifier)
  end
end
