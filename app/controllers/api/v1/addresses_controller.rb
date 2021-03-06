class Api::V1::AddressesController < ApplicationController
  def create
    @address = Address.new address_params

    if @address.save
      head :created
    else
      render json: @address.errors
    end
  end

  private

  def address_params
    params.permit :street,
                  :number,
                  :complement,
                  :city,
                  :state,
                  :country,
                  :zipcode,
                  :applicant_id
  end
end
