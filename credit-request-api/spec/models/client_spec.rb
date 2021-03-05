require 'rails_helper'

describe Client, type: :model do
  context 'associations' do
    it { is_expected.to have_many(:addresses) }
    it { is_expected.to have_many(:phones) }
    it { is_expected.to have_many(:credits) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:cnpj) }
  end

  context 'factory' do
    subject { build(:client) }

    it { is_expected.to be_valid }
  end
end
