require 'rails_helper'

RSpec.describe GenericCalculator do
  context 'When there is a valid calculation data' do
    it 'does calculate successfully' do
      specific_calculator = double('SomeSpecificCalculator')
      calculation_data = {fake_calculation_data: 'fake'}
      allow(specific_calculator).to receive(:calculate).with(calculation_data).and_return(10)

      subject = described_class.new(specific_calculator, calculation_data)

      expect(subject.calculate).to eq(10)
    end
  end

  context 'When there is an invalid calculation data' do
    it 'does raise specific error' do
      specific_calculator = double('SomeSpecificCalculator')
      calculation_data = {fake_calculation_data: 'fake'}
      allow(specific_calculator).to receive(:calculate).with(calculation_data).and_raise(ArgumentError)

      subject = described_class.new(specific_calculator, calculation_data)

      expect{ subject.calculate }.to raise_error(ArgumentError)
    end
  end
end
