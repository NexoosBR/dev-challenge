require 'rails_helper'

RSpec.describe Calculators::Generic do
  context 'When there is a valid calculation data' do
    it 'does calculate successfully' do
      specific_calculator = double('SomeSpecificCalculator')
      amount = 1
      monthly_fee = 1.5
      periods = 6

      allow(specific_calculator).to receive(:calculate)
        .with(amount, monthly_fee, periods).and_return(123456)

      subject = described_class.new.calculate(
        amount,
        monthly_fee,
        periods,
        specific_calculator
      )

      expect(subject).to eq(123456)
    end
  end
end
