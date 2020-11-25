class CreditRequestsController < ApplicationController
  after_action :create_payments, only: [:approve]

  def show
    @credit_request = ::CreditRequestPresenter.new(
      CreditRequest.find(params[:id])
    )
  end

  def create
    @request = create_credit_request

    if @request.persisted?
      flash[:success] = 'Solicitação criada com sucesso'
    else
      flash[:error] = "Ocorreu um erro ao criar a solicitação: #{@request.errors.messages}"
    end
    redirect_to @request
  end

  def approve
    @request = CreditRequest.find(params[:id])
    @request.approved!
    flash[:success] = 'Solicitação aprovada'

    redirect_to @request
  end

  def deny
    @request = CreditRequest.find(params[:id])
    @request.denied!
    flash[:success] = 'Solicitação reprovada'

    redirect_to @request
  end

  private

  def create_credit_request
    CreditRequestCreator.new.call(
      credit_request_params[:amount].to_f,
      credit_request_params[:periods].to_i,
      credit_request_params[:company_id].to_f,
    )
  end

  def create_payments
    PaymentsGenerator.new.generate_for_credit_request(@request)
  end

  def credit_request_params
    params.require(:credit_request).permit(:amount, :periods, :company_id)
  end
end
