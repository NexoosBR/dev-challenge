require 'rails_helper'

describe Installment, type: :model do
  context 'associations' do
    it { is_expected.to belong_to(:loan) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:payday) }

    it do
      is_expected.to validate_numericality_of(:value).is_greater_than(0)
    end
  end

  context 'factory' do
    subject { build(:installment) }

    it { is_expected.to be_valid }
  end
end
