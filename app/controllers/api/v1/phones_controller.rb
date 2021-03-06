class Api::V1::PhonesController < ApplicationController
  def create
    @phone = Phone.new phone_params

    if @phone.save
      head :created
    else
      render json: @phone.errors
    end
  end

  private

  def phone_params
    params.permit :number, :applicant_id
  end
end
