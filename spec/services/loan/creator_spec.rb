describe Loan::Creator do
  subject { described_class.new(client, params).call }

  let(:client) { create(:client) }
  let(:params) { { amount: amount, installments: installments, interest: interest } }

  let(:amount) { 100_000_00 }
  let(:installments) { 12 }
  let(:interest) { 1.50 }

  context 'with 10 parcels' do
    let(:installments) { 10 }

    it 'creates 1 credit' do
      expect { subject }.to change { client.credits.size }.by(1)
    end

    it 'creates 10 installments' do
      expect { subject }.to change { client.reload.installments.size }.by(10)
    end
  end
end
