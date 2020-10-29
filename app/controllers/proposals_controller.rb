class ProposalsController < ApplicationController
  before_action :authenticate_company!
  before_action :verify_profile, only: %i[new create]

  def show
    @proposal = Proposal.find(params[:id])
  end

  def new
    @company_profile = CompanyProfile.find_by(company: current_company)
    @proposal = Proposal.new
  end

  def create
    @company_profile = CompanyProfile.find_by(company: current_company)
    @proposal = @company_profile.proposals.new(proposal_params)
    if @proposal.save
      TaxCalcus.new(@proposal).calculate
      flash[:notice] = 'Proposta enviada com sucesso!'
      redirect_to @proposal
    else
      render :new
    end
  end

  private

  def verify_profile
    @profile = CompanyProfile.find_by(company: current_company)
    if @profile == nil
      @company_profile = CompanyProfile.new
      flash[:alert] = 'Antes de realizar uma solicitação, preencha seu perfil.'
      render 'company_profiles/new'
    end
  end

  def proposal_params
    params.require(:proposal).permit(:value, :installments, :expiration)
  end
end