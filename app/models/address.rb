class Address < ApplicationRecord
  belongs_to :client

  validates :state, :city, :number, presence: true
  validates :cep, length: { is: 8 }
end
