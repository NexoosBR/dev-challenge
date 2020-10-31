class Proposal < ApplicationRecord
  validates :value, :installments, :expiration, presence: true
  validate :expiration_date_valid?, :value_valid?
  validates :installments, numericality: { greater_than_or_equal_to: 3 }
  validates :installments, numericality: { less_than_or_equal_to: 60 }
  belongs_to :company_profile
  before_create :default_tax
  has_many :montly_installments, foreign_key: :proposal_id,
                                 class_name: 'Installment'

  private

  def default_tax
    self.tax ||= 0.015
  end

  def value_valid?
    return if value.blank?

    return if value.between?(5_000, 200_000)

    errors.add(:value, 'precisa estar entre R$ 5.000,00 e R$ 200.000,00')
  end

  def expiration_date_valid?
    return if expiration.blank?

    return if expiration.between?(1.months.from_now, 6.months.from_now)
      
    errors.add(:expiration, 'precisa ser entre '\
                            "#{I18n.l(1.months.from_now, format: :long)} e "\
                            "#{I18n.l(6.months.from_now, format: :long)}")
   end
end
