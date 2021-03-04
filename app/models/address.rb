class Address < ApplicationRecord
  validates :address, { presence: true }
  validates :neighborhood, { presence: true }
  validates :city, { presence: true }
  validates :zipcode, { presence: true }

  belongs_to :loan_applicant

  alias_attribute :company_address, :address

  enum fed_unit: {
    ES: 0, AC: 1, AL: 2, AP: 3, AM: 4, BA: 5, CE: 6,
    DF: 7, GO: 8, MA: 9, MT: 10, MS: 11, MG: 12, PA: 13,
    PB: 14, PR: 15, PE: 16, PI: 17, RJ: 18, RN: 19, RS: 20,
    RO: 21, RR: 22, SC: 23, SP: 24, SE: 25, TO: 26 
  }
end
