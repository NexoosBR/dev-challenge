class Api::V1::LoansController < ApplicationController
  def create
    @loan = Loan.new loan_params
    @loan.value = @loan.loan_request.value

    if @loan.save
      head :created
    else
      render json: @loan.errors
    end
  end

  private

  def loan_params
    params.permit :loan_request_id, :interest, :installments
  end
end
