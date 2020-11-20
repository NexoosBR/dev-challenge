class CompaniesController < ApplicationController
  def show
    @company = Company.find(params[:id])
  end

  def new_credit_request
    @company = Company.find(params[:id])
    @request = CreditRequest.new
  end
end
