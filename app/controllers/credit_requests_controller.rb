class CreditRequestsController < ApplicationController
  def show
    @credit_request = CreditRequest.find(params[:id])
  end

  def create
    @request = CreditRequest.create(credit_request_params)
    flash[:success] = 'Solicitação criada com sucesso'
    redirect_to @request
  end

  private

  def credit_request_params
    params.require(:credit_request).permit(:amount, :periods, :monthly_fee, :company_id, :monthly_value)
  end
end
