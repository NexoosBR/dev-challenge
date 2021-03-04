class LoanApplicantsController < ApplicationController
  before_action :set_loan_applicant, only: %i[ show edit update destroy ]

  # GET /loan_applicants or /loan_applicants.json
  def index
    @loan_applicants = LoanApplicant.all
  end

  # GET /loan_applicants/1 or /loan_applicants/1.json
  def show
  end

  # GET /loan_applicants/new
  def new
    @loan_applicant = LoanApplicant.new
  end

  # GET /loan_applicants/1/edit
  def edit
  end

  # POST /loan_applicants or /loan_applicants.json
  def create
    @loan_applicant = LoanApplicant.new(loan_applicant_params)

    respond_to do |format|
      if @loan_applicant.save
        format.html { redirect_to @loan_applicant, notice: "Loan applicant was successfully created." }
        format.json { render :show, status: :created, location: @loan_applicant }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @loan_applicant.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /loan_applicants/1 or /loan_applicants/1.json
  def update
    respond_to do |format|
      if @loan_applicant.update(loan_applicant_params)
        format.html { redirect_to @loan_applicant, notice: "Loan applicant was successfully updated." }
        format.json { render :show, status: :ok, location: @loan_applicant }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @loan_applicant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /loan_applicants/1 or /loan_applicants/1.json
  def destroy
    @loan_applicant.destroy
    respond_to do |format|
      format.html { redirect_to loan_applicants_url, notice: "Loan applicant was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_loan_applicant
      @loan_applicant = LoanApplicant.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def loan_applicant_params
      params.require(:loan_applicant).permit(:company_name, :company_number)
    end
end
