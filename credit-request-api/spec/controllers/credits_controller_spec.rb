require 'rails_helper'

describe CreditsController, type: :controller do
  describe '#index' do
    subject { get(:index) }

    before do
      create_list(:credit, 2)
    end

    it 'expect return all clients' do
      expect(subject).to have_http_status(:ok)
    end
  end

  describe '#create' do
    let(:client) { create(:client) }
    let(:params) do
      {
        client_id: client.id,
        value: Faker::Number.decimal(l_digits: 2, r_digits: 5)
      }
    end

    subject { post :create, params: params }

    context 'on success' do
      context 'creates a credit' do
        it 'expect return client created' do
          expect(subject).to have_http_status(:ok)

          expect(Credit.count).to eq(1)
        end
      end
    end

    context 'on error' do
      context 'creates a credit' do
        before do
          params[:value] = 0
          params[:client_id] = 0
        end

        it 'expect return errors' do
          expect(subject).to have_http_status(:unprocessable_entity)

          expect(Credit.count).to eq(0)

          errors = JSON.parse(subject.body)
          expect(errors['client']).to be_present
          expect(errors['value']).to be_present
        end
      end
    end
  end
end
