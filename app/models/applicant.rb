class Applicant < ApplicationRecord
  has_many :addresses
  has_many :phones
end
