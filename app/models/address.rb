class Address < ApplicationRecord
  validates :address, :zipcode, :city, :state, :country, presence: true
  belongs_to :addressable, polymorphic: true
end
