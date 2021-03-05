require 'rails_helper'

describe CreditSerializer, type: :serializer do
  let(:credit) { create(:credit) }

  subject { described_class.new(credit) }

  context 'includes the expected attributes' do
    let(:keys) { subject.attributes.keys }
    let(:attr_keys) { %i[id value remain created_at] }

    it { expect(keys).to match_array(attr_keys) }
  end
end
