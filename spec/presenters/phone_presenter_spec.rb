require "rails_helper"

describe PhonePresenter do
  context 'When presenting a cellphone number' do
    it 'does return correctly' do
      phone = create(:phone, number: 11965552233)

      subject = described_class.new(phone)

      expect(subject.number).to eq('(11) 96555-2233')
    end
  end

  context 'When presenting a home number' do
    it 'does return correctly' do
      phone = create(:phone, number: 1146442233)

      subject = described_class.new(phone)

      expect(subject.number).to eq('(11) 4644-2233')
    end
  end
end
