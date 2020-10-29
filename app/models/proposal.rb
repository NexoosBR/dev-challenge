class Proposal < ApplicationRecord
  validates :value, :installments, :expiration, presence: true
  validates :value, numericality: { greater_than_or_equal_to: 5_000 }
  validates :installments, numericality: { greater_than_or_equal_to: 3 }
  belongs_to :company_profile
  before_create :default_tax
  has_many :montly_installments, :foreign_key => "proposal_id", :class_name => 'Installment'

  private

  def default_tax
    self.tax ||= 0.015
  end
end
