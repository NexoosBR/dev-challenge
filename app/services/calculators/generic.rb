module Calculators
  class Generic
    def calculate(amount, monthly_fee, periods, specific_calculator)
      specific_calculator.calculate(
        amount,
        monthly_fee,
        periods
      )
    end
  end
end
