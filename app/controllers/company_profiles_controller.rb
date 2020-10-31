class CompanyProfilesController < ApplicationController
  before_action :authenticate_company!, only: %i[new show create edit update]

  def show
    if company_signed_in?
      @company_profile = CompanyProfile.find_by(company_id: current_company.id)
      @address = Address.new
      @contact = Contact.new
      if @company_profile.nil?
        redirect_to new_company_profile_path
      end
    end
  end

  def new
    @company_profile = CompanyProfile.new
    @company_profile.addresses.build
    @company_profile.contacts.build
  end

  def create
    @company_profile = current_company.build_company_profile(company_profile_params)    
    if @company_profile.save
      flash[:notice] = 'Perfil atualizado com sucesso!'
      redirect_to @company_profile
    else
      render :new
    end
  end

  def edit
    @company_profile = CompanyProfile.find(params[:id])
    @addresses = @company_profile.addresses
  end

  def update
    @company_profile = CompanyProfile.find(params[:id])
    if @company_profile.update(company_profile_params)
      flash[:notice] = 'Perfil atualizado com sucesso!'
      redirect_to @company_profile
    else
      render :edit
    end
  end

  private

  def company_profile_params
    params.require(:company_profile).permit(:name, :document,
                                            addresses_attributes: %i[id address
                                              zipcode city state country],
                                            contacts_attributes: %i[id contact
                                              contact_type])
  end
end