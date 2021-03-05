class Phone < ApplicationRecord
  validates :area_code, presence: true, format: { with: /\A[0-9]+\z/,
    message: "only allows numbers" }, length: { is: 2 }
  validates :phone_number, presence: true, length: { minimum: 8, maximum: 9}

  belongs_to :borrower


  enum phone_type: {
    TELPHONE: 0,
    CELLPHONE: 1
  }
end
