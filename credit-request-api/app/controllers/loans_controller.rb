class LoansController < ApplicationController
  def create
    service = ::LoanService::Create.new(loan_params).execute

    if service.success?
      render json: service.loan, status: :created
    else
      render json: service.loan.errors, status: :unprocessable_entity
    end
  end

  private

  def loan_params
    params.permit(%i[client_id credit_id value subdivision interest preview])
  end
end
