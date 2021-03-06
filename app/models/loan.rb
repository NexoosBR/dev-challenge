class Loan < ApplicationRecord
  belongs_to :loan_request
  has_many :installments

  after_create :generate_installments

  def generate_installments
    puts 'test'
    pmt = value * ((((1 + interest) ** installment_count) * interest) / (((1 + interest) ** installment_count) - 1))
    today = Date.today
    installment_count.times do |i|
      installments.create value: pmt, billing_date: today + i.months
    end
  end
end
