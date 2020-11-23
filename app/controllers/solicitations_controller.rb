class SolicitationsController < ApplicationController
  before_action :set_solicitation, only: [:show, :edit, :update, :destroy]

  # GET /solicitations
  # GET /solicitations.json
  def index
    @solicitations = Solicitation.all
    @company = Company.find(params[:company_id])
  end

  def show_installments
    @solicitation = Solicitation.find(params[:solicitation_id])
    @installments = @solicitation.installments
    @installments.filter{|inst|
                    inst.status == :pending && inst.expiration <= Date.today
                  }.map{|inst| inst.update!(status: :completed)}
  end

  # GET /solicitations/new
  def new
    @company = Company.find(params[:company_id])
    @solicitation = Solicitation.new(company_id: @company.id)
  end

  # GET /solicitations/1/edit
  def edit
  end

  # POST /solicitations
  # POST /solicitations.json
  def create
    @solicitation = Solicitation.new([{company_id: params[:company_id]}, solicitation_params].inject(:merge))

    respond_to do |format|
      if @solicitation.save
        format.html { redirect_to company_solicitations_path(params[:company_id]), notice: 'Solicitation was successfully created.' }
        format.json { render :show, status: :created, location: @solicitation }
      else
        format.html { render :new }
        format.json { render json: @solicitation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /solicitations/1
  # PATCH/PUT /solicitations/1.json
  def update
    respond_to do |format|
      if @solicitation.update(solicitation_params)
        format.html { redirect_to company_solicitations_path(@solicitation), notice: 'Solicitation was successfully updated.' }
        format.json { render :show, status: :ok, location: @solicitation }
      else
        format.html { render :edit }
        format.json { render json: @solicitation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /solicitations/1
  # DELETE /solicitations/1.json
  def destroy
    @solicitation.destroy
    respond_to do |format|
      format.html { redirect_to company_solicitations_path(@company.id), notice: 'Solicitation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_solicitation
      @solicitation = Solicitation.find(params[:id])
      @company = Company.find(params[:company_id])
    end

    # Only allow a list of trusted parameters through.
    def solicitation_params
      params.require(:solicitation).permit(:amount, :installments_number, :company_id, :description)
    end
end
