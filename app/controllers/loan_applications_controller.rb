class LoanApplicationsController < ApplicationController
  before_action :set_loan_application, only: %i[ show edit update destroy ]

  # GET /loan_applications or /loan_applications.json
  def index
    @loan_applications = LoanApplication.all
  end

  # GET /loan_applications/1 or /loan_applications/1.json
  def show
  end

  # GET /loan_applications/new
  def new
    @loan_application = LoanApplication.new
  end

  # GET /loan_applications/1/edit
  def edit
  end

  # POST /loan_applications or /loan_applications.json
  def create
    @loan_application = LoanApplication.new(loan_application_params)

    respond_to do |format|
      if @loan_application.save
        format.html { redirect_to @loan_application, notice: "Loan application was successfully created." }
        format.json { render :show, status: :created, location: @loan_application }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @loan_application.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /loan_applications/1 or /loan_applications/1.json
  def update
    respond_to do |format|
      if @loan_application.update(loan_application_params)
        format.html { redirect_to @loan_application, notice: "Loan application was successfully updated." }
        format.json { render :show, status: :ok, location: @loan_application }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @loan_application.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /loan_applications/1 or /loan_applications/1.json
  def destroy
    @loan_application.destroy
    respond_to do |format|
      format.html { redirect_to loan_applications_url, notice: "Loan application was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_loan_application
      @loan_application = LoanApplication.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def loan_application_params
      params.require(:loan_application).permit(:number_installments, :interest_rate, :status, :loan_applicant_id)
    end
end
