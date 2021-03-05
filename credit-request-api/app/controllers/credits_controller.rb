class CreditsController < ApplicationController
  def index
    render json: Credit.active.where(client_id: params[:client_id])
  end

  def create
    service = ::CreditService::Create.new(credit_params).execute

    if service.success?
      head :ok
    else
      render json: service.credit.errors, status: :unprocessable_entity
    end
  end

  private

  def credit_params
    params.permit(:client_id, :value)
  end
end
