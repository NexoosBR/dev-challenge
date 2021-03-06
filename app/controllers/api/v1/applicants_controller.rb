class Api::V1::ApplicantsController < ApplicationController
  def create
    @applicant = Applicant.new applicant_params

    if @applicant.save
      head :created
    else
      render json: @applicant.errors
    end
  end

  private

  def applicant_params
    params.permit(:company_name, :cnpj)
  end
end
