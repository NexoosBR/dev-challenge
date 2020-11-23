class Solicitation < ApplicationRecord
  belongs_to :company
  has_many :installments, dependent: :destroy

  validates :amount, presence: true
  validates :description, presence: true
  validates :installments_number, presence: true

  after_create do
    pmt = calc_pmt(self)
    self.installments_number.times do |t|
      Installment.create(solicitation_id: self.id, amount: pmt, expiration: one_month_away(t+1).end_of_month(), status: :pending)
    end
  end

  def one_month_away(t)
    Date.today + (t == 1 ? t.month : t.months)
  end

  def calc_pmt(solicitation)
    solicitation.amount * ((((1.015) ** solicitation.installments_number) * 0.015) / (((1.015) ** solicitation.installments_number) - 1))
  end

end
