require 'rails_helper'

RSpec.describe PaymentsGenerator do
  context 'When generating next payments by credit request' do
    it 'does create the right quantity of payments' do
      credit_request = create(:credit_request, status: :awaiting_approval, periods: 6)

      subject = described_class.new.generate_for_credit_request(credit_request)

      expect(subject.size).to eq(credit_request.periods)
      expect(credit_request.payments.size).to eq(credit_request.periods)
    end

    it 'does create right due dates' do
      credit_request = create(:credit_request, status: :awaiting_approval, periods: 6)

      subject = described_class.new.generate_for_credit_request(credit_request)
      today = Date.current
      dates = subject.map(&:due_date)

      expect(dates.first).not_to eq(today)
      expect(dates.last).to eq(today + credit_request.periods.months)
    end

    it 'does create right values' do
      credit_request = create(:credit_request, status: :awaiting_approval, periods: 6)

      subject = described_class.new.generate_for_credit_request(credit_request)
      values = subject.map(&:amount)

      expect(values.uniq.size).to eq(1)
      expect(values.shift).to eq(credit_request.monthly_value)

    end
  end
end
