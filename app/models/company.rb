class Company < ApplicationRecord
    has_many :solicitations, dependent: :destroy
    belongs_to :user
    
    validates :name, presence: true
    validates :cnpj, presence: true, uniqueness: true
    validates :address, presence: true
    validates :phone, presence: true
end
