require 'rails_helper'

describe ClientsController, type: :controller do
  describe '#index' do
    subject { get(:index) }

    before do
      create_list(:client, 2)
    end

    it 'expect return all clients' do
      expect(subject).to have_http_status(:ok)
    end
  end

  describe '#create' do
    let(:params) do
      {
        name: Faker::Company.unique.name,
        cnpj: Faker::Company.duns_number,
        phones_attributes: [
          { value: Faker::PhoneNumber.cell_phone }
        ],
        addresses_attributes: [
          { value: Faker::Address.street_address }
        ]
      }
    end

    subject { post :create, params: params }

    context 'on success' do
      context 'creates a client' do
        it 'expect return client created' do
          expect(subject).to have_http_status(:created)

          expect(Client.count).to eq(1)
          expect(Address.count).to eq(1)
          expect(Phone.count).to eq(1)

          client = JSON.parse(subject.body)
          expect(client['id']).to be_present
          expect(client['name']).to be_present
          expect(client['cnpj']).to be_present
        end
      end
    end

    context 'on error' do
      context 'creates a client' do
        before do
          params[:name] = ''
          params[:phones_attributes][0][:value] = ''
        end

        it 'expect return errors' do
          expect(subject).to have_http_status(:unprocessable_entity)

          expect(Client.count).to eq(0)
          expect(Address.count).to eq(0)
          expect(Phone.count).to eq(0)

          errors = JSON.parse(subject.body)
          expect(errors['name']).to be_present
          expect(errors['phones.value']).to be_present
        end
      end
    end
  end
end
