class ClientsController < ApplicationController
  def index
    render json: Client.all
  end

  def create
    service = ::ClientService::Create.new(clients_params).execute

    if service.success?
      render json: service.client, status: :created
    else
      render json: service.client.errors, status: :unprocessable_entity
    end
  end

  private

  def clients_params
    params.permit(:name, :cnpj, addresses_attributes: %w[id value _destroy], phones_attributes: %w[id value _destroy])
  end
end
