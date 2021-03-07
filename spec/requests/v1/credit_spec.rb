describe V1::CreditsController do
  describe 'POST /v1/clients/:id/credit' do
    context 'with a positive amount' do
      let(:client) { create(:client) }
      let(:params) { { credit: { amount: 2000 } } }

      before { post v1_client_credits_path(client.cnpj), params: params }

      it 'creates a new credit application' do
        expect(response).to have_http_status(:created)
        expect(Credit.last.amount).to eq(2000)
        expect(Credit.last.client).to eq(client)
      end

      it 'returns the created credit application' do
        json_response = JSON.parse(response.body, symbolize_names: true)

        expect(json_response[:amount]).to eq(2000)
        expect(json_response[:client_id]).to eq(client.id)
      end
    end
  end

  describe 'POST /v1/clients/:id/credit/calculate' do
    context 'with a positive amount' do
      let(:client) { create(:client) }
      let(:params) { { credit: { amount: 100_000_00, interest: 1.5, installments: 12 } } }

      before { post calculate_v1_client_credits_path(client.cnpj), params: params }

      it 'creates a new credit application' do
        json_response = JSON.parse(response.body, symbolize_names: true)

        expect(json_response[:parcel_amount]).to eq(9168.0)
      end
    end
  end
end
