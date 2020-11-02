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
    @loan = current_company.loans.new(loan_params)
    @loan.rate = 0.015

    if @loan.save
      redirect_to @loan, notice: t(:created, model: t(:loan, scope: 'activerecord.models'))
    else
      render :new
    end
  end

  # PATCH/PUT /loans/1
  def update
    if @loan.update(loan_params)
      redirect_to @loan, notice: t(:updated, model: t(:loan, scope: 'activerecord.models'))
    else
      render :edit
    end
  end

  # DELETE /loans/1
  def destroy
    @loan.destroy
    redirect_to loans_url, notice: t(:deleted, model: t(:loan, scope: 'activerecord.models'))
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_loan
      @loan = Loan.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def loan_params
      params.require(:loan).permit(:value, :rate, :number_installments)
    end
end
