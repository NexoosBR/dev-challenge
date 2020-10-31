class ContactsController < ApplicationController
  def create
    @company_profile = CompanyProfile.find(params[:company_profile_id])
    @contact = @company_profile.contacts.build(addresses_params)
    if @contact.save
      flash[:notice] = 'Contato adicionado com sucesso!'
    else
      flash[:notice] = 'Contato não adicionado. Preencha todos os campos!'
    end
    redirect_to @company_profile
  end

  private

  def addresses_params
    params.require(:contact).permit(:contact, :contact_type, :company_profile_id)
  end
end