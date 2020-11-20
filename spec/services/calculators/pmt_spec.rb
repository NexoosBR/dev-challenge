require 'rails_helper'

RSpec.describe Calculators::Pmt do
  context 'When there is a valid calculation data' do
    it 'does calculate successfully' do
      calculation_data = {
        amount: 100000,
        monthly_fee: 0.015,
        periods: 12,
      }

      subject = described_class.new(calculation_data).calculate

      expect(subject).to eq(9167.999290622945)
    end
  end

  context 'When there is a missing variable' do
    it 'does raise an error' do
      calculation_data = {
        monthly_fee: 0.015,
        periods: 12,
      }

      subject = described_class.new(calculation_data)

      expect{ subject.calculate }.to raise_error(ArgumentError)
    end
  end

  context 'When there is a non numeric variable' do
    it 'does raise an error' do
      calculation_data = {
        amount: 100000,
        monthly_fee: 'not a number',
        periods: 12,
      }

      subject = described_class.new(calculation_data)

      expect{ subject.calculate }.to raise_error(ArgumentError)
    end
  end
end
