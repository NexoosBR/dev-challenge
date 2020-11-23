class CreditRequest < ApplicationRecord
  has_many :payments
  belongs_to :company
  after_create :update_monthly_fee_and_value # remove from here

  enum status: [ :awaiting_approval, :approved, :denied ]

  before_create do
    self.status = 0
  end

  def approve
    approved!
  end

  def deny
    denied!
  end

  private

  def update_monthly_fee_and_value
    self.update(
      monthly_fee: calculate_monthly_fee,
      monthly_value: calculate_pmt,
    )
  end

  def calculate_pmt
    Calculators::Pmt.new(
      amount: self.amount,
      monthly_fee: calculate_monthly_fee,
      periods: self.periods,
    ).calculate
  end

  def calculate_monthly_fee
    MonthlyFeeVerifier.new.verify_by_period(self.periods)
  end
end