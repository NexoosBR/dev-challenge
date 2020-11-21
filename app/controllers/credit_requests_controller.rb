class CreditRequestsController < ApplicationController
  after_action :create_payments, only: [:approve]

  def show
    @credit_request = CreditRequest.find(params[:id])
  end

  def create
    @request = CreditRequest.create(credit_request_params)
    flash[:success] = 'Solicitação criada com sucesso'
    redirect_to @request
  end

  def approve
    @request = CreditRequest.find(params[:id])
    @request.approved!
    flash[:success] = 'Solicitação aprovada'

    redirect_to @request
  end

  private

  def create_payments
    PaymentsGenerator.new.generate_for_credit_request(@request)
  end

  def credit_request_params
    params.require(:credit_request).permit(:amount, :periods, :monthly_fee, :company_id, :monthly_value)
  end
end
