require 'rails_helper'

describe PhoneSerializer, type: :serializer do
  let(:phone) { create(:phone) }

  subject { described_class.new(phone) }

  context 'includes the expected attributes' do
    let(:keys) { subject.attributes.keys }
    let(:attr_keys) { %i[id value] }

    it { expect(keys).to match_array(attr_keys) }
  end
end
