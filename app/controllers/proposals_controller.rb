class ProposalsController < ApplicationController
  def show
    @proposal = Proposal.find(params[:id])
  end

  def new
    @company_profile = CompanyProfile.find(params[:company_profile_id])
    @proposal = Proposal.new
  end

  def create
    @company_profile = CompanyProfile.find(params[:company_profile_id])
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

  def proposal_params
    params.require(:proposal).permit(:value, :installments, :expiration)
  end
end