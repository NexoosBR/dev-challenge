require 'rails_helper'

describe LoanSerializer, type: :serializer do
  let(:loan) { create(:loan, :with_installments) }

  subject { described_class.new(loan) }

  context 'includes the expected attributes' do
    let(:keys) { subject.attributes.keys }
    let(:attr_keys) { %i[id value total subdivision interest installments] }

    it { expect(keys).to match_array(attr_keys) }
    it { expect(subject.serializable_hash[:installments].first).to be_instance_of(InstallmentSerializer) }
  end
end
