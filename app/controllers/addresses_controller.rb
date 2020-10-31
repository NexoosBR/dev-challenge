class AddressesController < ApplicationController
  def create
    @company_profile = CompanyProfile.find(params[:company_profile_id])
    @address = @company_profile.addresses.build(addresses_params)
    if @address.save
      flash[:notice] = 'Endereço adicionado com sucesso!'
    else
      flash[:notice] = 'Endereço não adicionado. Preencha todos os campos!'
    end
    redirect_to @company_profile
  end

  private

  def addresses_params
    params.require(:address).permit(:address, :zipcode, :city, :state, :country,
                                    :company_profile_id)
  end
end