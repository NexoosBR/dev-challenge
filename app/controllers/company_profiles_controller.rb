class CompanyProfilesController < ApplicationController
  before_action :authenticate_company!, only: %i[new show create edit update]

  def show
    if company_signed_in?
      @company_profile = CompanyProfile.find_by(company_id: current_company.id)
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

  private

  def company_profile_params
    params.require(:company_profile).permit(:name, :document,
                                            addresses_attributes: %i[address
                                              zipcode city state country],
                                            contacts_attributes: %i[contact
                                              contact_type])
  end
end