class PaymentPresenter < SimpleDelegator
  include ActiveSupport::NumberHelper

  def amount
    number_to_currency(
      super,
      unit: "R$",
      separator: ",",
      delimiter: "."
    )
  end

  def due_date
    super.strftime('%d/%m/%Y')
  end
end
