class Installment < ActiveRecord::Base
  belongs_to :loan

  validates :payday, presence: true
  validates :value, numericality: { greater_than: 0 }
end
