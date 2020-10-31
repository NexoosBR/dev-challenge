class LoansController < ApplicationController
  before_action :set_loan, only: [:show, :edit, :update, :destroy]

  # GET /loans
  def index
    @loans = current_company.loans.all
  end

  # GET /loans/1
  def show
  end

  # GET /loans/new
  def new
    @loan = Loan.new
  end

  # GET /loans/1/edit
  def edit
  end

  # POST /loans
  def create
    @loan = Loan.new(loan_params)
    @loan.company = current_company
    @loan.rate = 0.015

      if @loan.save
        redirect_to @loan, notice: 'Loan was successfully created.'
      else
        render :new
      end
  end

  # PATCH/PUT /loans/1
  def update
    if @loan.update(loan_params)
      redirect_to @loan, notice: 'Loan was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /loans/1
  def destroy
    @loan.destroy
    redirect_to loans_url, notice: 'Loan was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_loan
      @loan = Loan.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def loan_params
      params.require(:loan).permit(:value, :rate, :number_installments, :company_id)
    end
end
