require 'rails_helper'

describe ClientSerializer, type: :serializer do
  let(:client) { create(:client) }

  subject { described_class.new(client) }

  before do
    create(:address, client: client)
    create(:phone, client: client)
  end

  context 'includes the expected attributes' do
    let(:keys) { subject.attributes.keys }
    let(:attr_keys) { %i[id name cnpj addresses phones] }

    it { expect(keys).to match_array(attr_keys) }
    it { expect(subject.serializable_hash[:addresses].first).to be_instance_of(AddressSerializer) }
    it { expect(subject.serializable_hash[:phones].first).to be_instance_of(PhoneSerializer) }
  end
end
