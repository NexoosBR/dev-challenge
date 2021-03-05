require 'rails_helper'

describe LoanService::Create, type: :service do
  let(:credit) { create(:credit, value: 100_000.00, remain: 100_000.00) }
  let(:params) do
    {
      client_id: credit.client_id,
      credit_id: credit.id,
      value: 100_000.00,
      interest: 0.015,
      subdivision: 12,
      preview: false
    }
  end

  describe '#execute' do
    context 'on success' do
      it 'creates a loan' do
        service = described_class.new(params).execute
        loan = service.loan

        expect(loan.id).to be_present
        expect(loan.value).to eq(100_000.00)
        expect(loan.total).to eq(110_016.00)
        expect(loan.subdivision).to eq(12)
        expect(loan.interest).to eq(0.015)
        expect(loan.installments.count).to eq(12)
        expect(loan.credit.remain).to eq(0)

        loan.installments.each do |installment|
          expect(installment.value).to eq(9_168.00)
        end
      end

      context 'when is preview' do
        it 'returns a loan' do
          params[:preview] = true
          service = described_class.new(params).execute
          loan = service.loan

          expect(loan.id).to be_blank
          expect(loan.value).to eq(100_000.00)
          expect(loan.total).to eq(110_016.00)
          expect(loan.subdivision).to eq(12)
          expect(loan.interest).to eq(0.015)
          expect(loan.credit.remain).to eq(100_000.00)

          loan.installments.each do |installment|
            expect(installment.value).to eq(9_168.00)
          end
        end
      end
    end

    context 'on error' do
      it 'returns errors' do
        params[:value] = 0
        service = described_class.new(params).execute

        expect(service.loan.id).to be_blank
        expect(service.loan.errors).to be_present
      end

      it 'credit_id is null' do
        params[:credit_id] = 0
        service = described_class.new(params).execute

        expect(service.loan.id).to be_blank
        expect(service.loan.errors).to be_present
      end
    end
  end
end
