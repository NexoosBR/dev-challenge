module Calculators
  class Pmt
    def initialize(calculation_data)
      @amount = calculation_data[:amount]
      @monthly_fee = calculation_data[:monthly_fee]
      @periods = calculation_data[:periods]
    end

    def calculate
      raise ArgumentError unless valid_calculation_data?

      @amount * ((((1 + adapted_fee) ** @periods) * adapted_fee) / (((1 + adapted_fee) ** @periods) - 1))
    end

    private

    def valid_calculation_data?
      valid_amount? && valid_monthly_fee? && valid_periods?
    end

    def valid_amount?
      @amount.present? && @amount.is_a?(Numeric)
    end

    def valid_monthly_fee?
      @monthly_fee.present? && @monthly_fee.is_a?(Numeric)
    end

    def valid_periods?
      @periods.present? && @periods.is_a?(Numeric)
    end

    def adapted_fee
      @monthly_fee / 100
    end
  end
end
