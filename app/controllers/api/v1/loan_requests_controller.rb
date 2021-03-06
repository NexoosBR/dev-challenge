class Api::V1::LoanRequestsController < ApplicationController
  def create
    @loan_request = LoanRequest.new loan_request_params

    if @loan_request.save
      head :created
    else
      render json: @loan_request.errors
    end
  end

  private

  def loan_request_params
    params.permit :value, :applicant_id
  end
end
