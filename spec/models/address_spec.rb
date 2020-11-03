require 'rails_helper'

RSpec.describe Address, type: :model do
  let!(:company) { create(:company) }
  let(:address) { create(:address, company: company) }

  context 'validates address' do
    it 'should address is valid' do
      expect(address).to be_valid
    end

    it 'is not valid without zipcode' do
      address.update(zipcode: nil)
      address.reload
      expect(address.zipcode).to_not be_nil
    end

    it 'is not valid without number ' do
      address.update(number: nil)
      address.reload
      expect(address.number).to_not be_nil
    end

    it 'is not valid without street' do
      address.update(street: nil)
      address.reload
      expect(address.street).to_not be_nil
    end

    it 'is not valid without city' do
      address.update(city: nil)
      address.reload
      expect(address.city).to_not be_nil
    end

    it 'is not valid without state' do
      address.update(state: nil)
      address.reload
      expect(address.state).to_not be_nil
    end

    it 'is not valid without country' do
      address.update(country: nil)
      address.reload
      expect(address.country).to_not be_nil
    end
  end
end
