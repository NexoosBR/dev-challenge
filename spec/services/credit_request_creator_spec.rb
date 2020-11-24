require 'rails_helper'

RSpec.describe CreditRequestCreator do
  context 'When creating a request' do
    it 'does create correctly' do
      company = create(:company)

      subject = described_class.new.call(100000, 12, company.id)

      expect(subject).to be_a(CreditRequest)
      expect(subject.monthly_fee).to eq(1.5)
      expect(subject.monthly_value).to eq(9167.999290622945)
    end
  end
end
