describe V1::ClientsController do
  describe 'POST /v1/clients' do
    context 'with the right parameters' do
      let(:params) do
        { client: {
          name: 'My company',
          cnpj: '12345678000109',
          phones: ['11912344321'],
          addresses_attributes: [
            { cep: '12345090',
              street: '3rd Avenue',
              state: 'NY',
              city: 'New York',
              number: '123',
              complement: '10th floor' }
          ]
        } }
      end

      before { post v1_clients_path, params: params }

      it 'create a new client' do
        expect(response).to have_http_status(:created)
        expect(Client.last.name).to eq('My company')
        expect(Client.last.cnpj).to eq('12345678000109')
        expect(Client.last.phones).to eq(['11912344321'])
        expect(Client.last.addresses[0].cep).to eq('12345090')
        expect(Client.last.addresses[0].street).to eq('3rd Avenue')
        expect(Client.last.addresses[0].state).to eq('NY')
        expect(Client.last.addresses[0].city).to eq('New York')
        expect(Client.last.addresses[0].number).to eq('123')
        expect(Client.last.addresses[0].complement).to eq('10th floor')
      end

      it 'return the created client' do
        json_response = JSON.parse(response.body, symbolize_names: true)
        first_address = json_response[:addresses].first

        expect(json_response[:name]).to eq('My company')
        expect(json_response[:cnpj]).to eq('12345678000109')
        expect(json_response[:phones]).to eq(['11912344321'])

        expect(first_address[:cep]).to eq('12345090')
        expect(first_address[:street]).to eq('3rd Avenue')
        expect(first_address[:state]).to eq('NY')
        expect(first_address[:city]).to eq('New York')
        expect(first_address[:number]).to eq('123')
        expect(first_address[:complement]).to eq('10th floor')
      end
    end
  end

  describe 'GET /v1/clients/:id_or_cnpj' do
    context 'with an existing client' do
      let(:client) { create(:client, name: 'Empresa Existente', cnpj: '12345678000109') }

      before { get v1_client_path(client.cnpj) }

      it 'return the client' do
        json_response = JSON.parse(response.body, symbolize_names: true)

        expect(response).to have_http_status(:ok)
        expect(json_response[:name]).to eq('Empresa Existente')
        expect(json_response[:cnpj]).to eq('12345678000109')
      end
    end

    context 'with an inexistent client' do
      before { get v1_client_path('-1') }

      it 'returns an not found error' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
