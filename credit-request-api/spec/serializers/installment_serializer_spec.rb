require 'rails_helper'

describe InstallmentSerializer, type: :serializer do
  let(:installment) { create(:installment) }

  subject { described_class.new(installment) }

  context 'includes the expected attributes' do
    let(:keys) { subject.attributes.keys }
    let(:attr_keys) { %i[id value payday] }

    it { expect(keys).to match_array(attr_keys) }
  end
end
