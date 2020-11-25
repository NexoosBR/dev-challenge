require "rails_helper"

describe PaymentPresenter do
  context 'When presenting the amount' do
    it 'does return correctly' do
      payment = create(:payment, amount: 100000)

      subject = described_class.new(payment)

      expect(subject.amount).to eq('R$100.000,00')
    end
  end

  context 'When presenting the due_date' do
    it 'does return correctly' do
      payment = create(:payment, amount: 100000, due_date: Date.parse('22-02-2020'))

      subject = described_class.new(payment)

      expect(subject.due_date).to eq('22/02/2020')
    end
  end
end
