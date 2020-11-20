class CreditRequestsController < ApplicationController
  def show
    @credit_request = CreditRequest.find(params[:id])
  end
end
