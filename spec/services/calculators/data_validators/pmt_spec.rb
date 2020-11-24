require 'rails_helper'

RSpec.describe Calculators::DataValidators::Pmt do
  context 'When validating data and everithing is ok' do
    it 'does return true' do
      data = {
        amount:      1,
        monthly_fee: 1,
        periods:     6,
      }

      subject = described_class.new.valid_data?(data)

      expect(subject).to eq(true)
    end
  end

  context 'When validating data and there is a missing param' do
    it 'does return false' do
      data = {
        amount:      1,
        periods:     6,
      }

      subject = described_class.new.valid_data?(data)

      expect(subject).to eq(false)
    end
  end

  context 'When validating data and there is a string param' do
    it 'does return false' do
      data = {
        amount:      1,
        monthly_fee: 1,
        periods:     'six',
      }

      subject = described_class.new.valid_data?(data)

      expect(subject).to eq(false)
    end
  end
end
