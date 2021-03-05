require 'rails_helper'

describe LoansController, type: :controller do
  describe '#create' do
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

    subject { post :create, params: params }

    context 'on success' do
      context 'creates a loan' do
        it 'expect return loan created' do
          expect(subject).to have_http_status(:created)

          expect(Loan.count).to eq(1)

          loan = JSON.parse(subject.body)
          expect(loan['id']).to be_present
          expect(loan['value']).to be_present
          expect(loan['total']).to be_present
          expect(loan['subdivision']).to be_present
          expect(loan['interest']).to be_present
          expect(loan['installments']).to be_present
        end

        context 'when is preview' do
          it 'returns a loan' do
            params[:preview] = true
            expect(subject).to have_http_status(:created)

            expect(Loan.count).to eq(0)

            loan = JSON.parse(subject.body)
            expect(loan['id']).to be_blank
            expect(loan['value']).to be_present
            expect(loan['total']).to be_present
            expect(loan['subdivision']).to be_present
            expect(loan['interest']).to be_present
            expect(loan['installments']).to be_present
          end
        end
      end
    end

    context 'on error' do
      context 'creates a loan' do
        it 'expect return errors' do
          params[:credit_id] = nil
          expect(subject).to have_http_status(:unprocessable_entity)

          expect(Loan.count).to eq(0)

          errors = JSON.parse(subject.body)
          expect(errors['value']).to be_present
        end
      end
    end
  end
end
