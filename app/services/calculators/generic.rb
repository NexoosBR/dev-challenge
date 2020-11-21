module Calculators
  class Generic
    def initialize(specific_calculator)
      @specific_calculator = specific_calculator
    end

    def calculate
      @specific_calculator.calculate
    end
  end
end
