class GenericCalculator
  def initialize(specific_calculator, calculation_data)
    @specific_calculator = specific_calculator
    @calculation_data = calculation_data
  end

  def calculate
    @specific_calculator.calculate(@calculation_data)
  end
end
