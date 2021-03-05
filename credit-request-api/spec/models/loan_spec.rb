require 'rails_helper'

describe Loan, type: :model do
  context 'associations' do
    it { is_expected.to belong_to(:client) }
    it { is_expected.to belong_to(:credit) }
  end

  context 'validations' do
    it do
      is_expected.to validate_numericality_of(:value).is_greater_than(0)
      is_expected.to validate_numericality_of(:subdivision).is_greater_than(0)
      is_expected.to validate_numericality_of(:interest).is_greater_than(0)
    end
  end

  context 'factory' do
    subject { build(:loan) }

    it { is_expected.to be_valid }
  end
end
