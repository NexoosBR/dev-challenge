class Loan < ActiveRecord::Base
  belongs_to :client
  belongs_to :credit
  has_many :installments

  accepts_nested_attributes_for :installments, allow_destroy: true

  before_create :update_remain_credits

  validates :value, numericality: { greater_than: 0 }
  validates :total, numericality: { greater_than_or_equal_to: :value }
  validates :subdivision, numericality: { greater_than: 0 }
  validates :interest, numericality: { greater_than: 0 }

  validate :credit_value_exceeded

  private

  def update_remain_credits
    credit.remain = credit.remain - value
    credit.save
  end

  def credit_value_exceeded
    exceeded = (value || 0) > (credit&.remain || 0)
    errors.add(:value, :invalid) if exceeded
  end
end
