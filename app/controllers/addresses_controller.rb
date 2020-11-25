class AddressesController < ApplicationController
  def create
    address = Address.new(address_params)

    if address.save
      flash[:success] = 'Endereço adicionado.'
      redirect_to address.company
    else
      flash[:error] = 'Ocorreu um erro:'
      address.errors.messages.each do |key, error_message|
        flash[:error] << " - #{t(key)}: #{error_message.last} "
      end
      redirect_to new_address_company_path(address.company_id)
    end
  end

  private

  def address_params
    params.require(:address).permit(:street, :number, :company_id)
  end
end
