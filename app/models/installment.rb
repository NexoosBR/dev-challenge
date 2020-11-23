class Installment < ApplicationRecord
    belongs_to :solicitation
    enum status: [:pending, :completed]
    
    validates :amount, presence: true
    validates :expiration, presence: true
    validates :status, presence: true
end
