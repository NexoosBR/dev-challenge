require 'rails_helper'

RSpec.describe Calculators::Pmt do
  context 'When there is a valid calculation data' do
    it 'does calculate successfully' do
      amount= 100000
      monthly_fee= 1.5
      periods= 12

      subject = described_class.new.calculate(
        amount,
        monthly_fee,
        periods,
      )

      expect(subject).to eq(9167.999290622945)
    end
  end

  context 'When there is an invalid parameter' do
    it 'does raise an error' do
      allow_any_instance_of(Calculators::DataValidators::Pmt).to receive(:valid_data?)
        .and_return(false)

      subject = described_class.new

      expect{ subject.calculate(1,2,3) }.to raise_error(ArgumentError)
    end
  end
end
