module Calculators
  class Pmt
    def calculate(amount, monthly_fee, periods)
      raise ArgumentError unless validator.valid_data?(
        amount:      amount,
        monthly_fee: monthly_fee,
        periods:     periods,
      )

      amount * ((((1 + adapted_fee(monthly_fee)) ** periods) * adapted_fee(monthly_fee)) / (((1 + adapted_fee(monthly_fee)) ** periods) - 1))
    end

    private

    def adapted_fee(monthly_fee)
      monthly_fee / 100
    end

    def validator
      DataValidators::Pmt.new
    end
  end
end
