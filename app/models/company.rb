class Company < ApplicationRecord
  has_many :phones
  has_many :addresses
  has_many :credit_requests
end
