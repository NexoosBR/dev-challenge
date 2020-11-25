class CreditRequestPresenter < SimpleDelegator
  include ActiveSupport::NumberHelper

  def amount
    number_to_currency(
      super,
      unit: "R$",
      separator: ",",
      delimiter: "."
    )
  end

  def payments
    super.map do |payment|
      PaymentPresenter.new(payment)
    end
  end

  def monthly_fee
    "#{super}%"
  end

  def monthly_value
    number_to_currency(
      super.round(2),
      unit: "R$",
      separator: ",",
      delimiter: "."
    )
  end

  def id
    super.to_s.rjust(7, '0')
  end
end
