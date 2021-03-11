module ApplicationHelper
  def number_to_currency_br(number, no_unit: false)
    unit = no_unit ? "" : "R$ "
    number_to_currency(number, :unit => unit, :separator => ",", :delimiter => ".")
  end
end
