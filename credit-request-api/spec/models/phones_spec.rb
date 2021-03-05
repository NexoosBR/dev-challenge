require 'rails_helper'

describe Phone, type: :model do
  context 'associations' do
    it { is_expected.to belong_to(:client) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:value) }
  end

  context 'factory' do
    subject { build(:address) }

    it { is_expected.to be_valid }
  end
end
