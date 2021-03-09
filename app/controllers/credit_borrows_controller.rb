class CreditBorrowsController < ApplicationController
  before_action :set_credit_borrow, only: %i[ show edit update destroy ]
  before_action :set_borrower, only: %i[ index new create ]

  # GET /credit_borrows or /credit_borrows.json
  def index
    @credit_borrows = @borrower.credit_borrows
  end

  # GET /credit_borrows/1 or /credit_borrows/1.json
  def show
  end

  # GET /credit_borrows/new
  def new
    @credit_borrow = CreditBorrow.new
  end

  # GET /credit_borrows/1/edit
  def edit
  end

  # POST /credit_borrows or /credit_borrows.json
  def create
    @credit_borrow = @borrower.credit_borrows.build(credit_borrow_params)

    respond_to do |format|
      if @credit_borrow.save
        format.html { redirect_to @credit_borrow, notice: "Credit borrow was successfully created." }
        format.json { render :show, status: :created, location: @credit_borrow }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @credit_borrow.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /credit_borrows/1 or /credit_borrows/1.json
  def update
    respond_to do |format|
      if @credit_borrow.update(credit_borrow_params)
        format.html { redirect_to @credit_borrow, notice: "Credit borrow was successfully updated." }
        format.json { render :show, status: :ok, location: @credit_borrow }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @credit_borrow.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /credit_borrows/1 or /credit_borrows/1.json
  def destroy
    @credit_borrow.destroy
    respond_to do |format|
      format.html { redirect_to credit_borrows_url, notice: "Credit borrow was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_credit_borrow
      @credit_borrow = CreditBorrow.find(params[:id])
    end

    def set_borrower
      @borrower = Borrower.find(params[:borrower_id])
    end

    # Only allow a list of trusted parameters through.
    def credit_borrow_params
      params.require(:credit_borrow).permit(:amount, :status, :borrower_id)
    end
end
