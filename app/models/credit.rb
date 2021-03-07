class Credit < ApplicationRecord
  belongs_to :client
  has_many :installments, dependent: :destroy
end
