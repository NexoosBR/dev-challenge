class Address < ApplicationRecord
  belongs_to :company

  validates :zipcode, :country, :state, :city, :neighborhood, :street, :number, presence: true
end
