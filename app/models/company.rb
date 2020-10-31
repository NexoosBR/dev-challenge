class Company < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :phone_numbers, dependent: :destroy
  has_many :loans

  validate :check_cnpj

  private
    def check_cnpj
      errors.add(:add, I18n.t(:invalid_cnpj)) unless CNPJ.valid?(self.cnpj)
    end
end
