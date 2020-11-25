require "rails_helper"

describe CreditRequestPresenter do
  context 'When presenting the amount' do
    it 'does return correctly' do
      credit_request = create(:credit_request, amount: 100000)

      subject = described_class.new(credit_request)

      expect(subject.amount).to eq('R$100.000,00')
    end
  end

  context 'When presenting the payments' do
    it 'does return correctly' do
      credit_request = create(:credit_request)
      create_list(:payment, 10, credit_request: credit_request)

      subject = described_class.new(credit_request).payments

      expect(subject).to be_a(Array)
      expect(subject.last).to be_a(PaymentPresenter)
    end
  end

  context 'When presenting the payments' do
    it 'does return correctly' do
      credit_request = create(:credit_request, monthly_fee: 1.5)

      subject = described_class.new(credit_request).monthly_fee

      expect(subject).to be_a(String)
      expect(subject).to eq('1.5%')
    end
  end

  context 'When presenting the monthly_value' do
    it 'does return correctly' do
      credit_request = create(:credit_request, monthly_value: 9167.999290622945)

      subject = described_class.new(credit_request)

      expect(subject.monthly_value).to eq('R$9.168,00')
    end
  end

  context 'When presenting the id' do
    it 'does return correctly' do
      credit_request = create(:credit_request)

      subject = described_class.new(credit_request)

      expect(subject.id).to be_a(String)
      expect(subject.id.size).to eq(7)

    end
  end
end
