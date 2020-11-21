require 'rails_helper'

RSpec.describe MonthlyFeeVerifier do
  context 'When checking fee by period' do
    let(:fee_hash) {{
      6  => 0.005,
      12 => 0.015,
      24 => 0.03,
      48 => 0.06,
    }}

    it 'does return right value, with 6' do
      subject = described_class.new
      allow(subject).to receive(:month_fee_by_periods).and_return(fee_hash)

      expect(subject.verify_by_period(6)).to eq(fee_hash[6])
    end

    it 'does return right value, with 12' do
      subject = described_class.new
      allow(subject).to receive(:month_fee_by_periods).and_return(fee_hash)

      expect(subject.verify_by_period(12)).to eq(fee_hash[12])
    end

    it 'does return right value, with 24' do
      subject = described_class.new
      allow(subject).to receive(:month_fee_by_periods).and_return(fee_hash)

      expect(subject.verify_by_period(24)).to eq(fee_hash[24])
    end

    it 'does return right value, with 48' do
      subject = described_class.new
      allow(subject).to receive(:month_fee_by_periods).and_return(fee_hash)

      expect(subject.verify_by_period(48)).to eq(fee_hash[48])
    end
  end

  context 'When checking available_periods' do
    it 'does return the correct array' do
      subject = described_class.new.available_periods

      expect(subject).to eq([6, 12, 24, 48])
    end
  end
end
