require 'rails_helper'

RSpec.describe PhoneNumber, type: :model do
  let!(:company) { create(:company) }
  let(:phone_number) { create(:phone_number, company: company) }

  context 'validates phone_number' do
    it 'should phoneNumber is valid' do
      expect(phone_number).to be_valid
    end

    it 'is not valid without number' do
      phone_number.update(number: nil)
      phone_number.reload
      expect(phone_number.number).to_not be_nil
    end
  end
end
