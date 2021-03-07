describe Loan::Calculator do
  subject { described_class.call(**params) }

  let(:params) { { amount: amount, installments: installments, interest: interest } }
  context 'calculate 12 parcels' do
    let(:installments) { 12 }

    context 'with 1.50% interest' do
      let(:interest) { 1.50 }

      context 'of 100.000,00' do
        let(:amount) { 100_000_00 }

        it { is_expected.to eq(9168.00) }
      end

      context 'of 50.000,00' do
        let(:amount) { 50_000_00 }

        it { is_expected.to eq(4584.00) }
      end

      context 'of 5.000,00' do
        let(:amount) { 5_000_00 }

        it { is_expected.to eq(458.40) }
      end
    end
  end
end
