class BorrowingsController < ApplicationController
  before_action :set_borrowing, only: %i[ show edit update destroy ]

  # GET /borrowings or /borrowings.json
  def index
    @borrowings = Borrowing.all
  end

  # GET /borrowings/1 or /borrowings/1.json
  def show
  end

  # GET /borrowings/new
  def new
    @borrowing = Borrowing.new
  end

  # GET /borrowings/1/edit
  def edit
  end

  # POST /borrowings or /borrowings.json
  def create
    @borrowing = Borrowing.new(borrowing_params)

    respond_to do |format|
      if @borrowing.save
        format.html { redirect_to @borrowing, notice: "Borrowing was successfully created." }
        format.json { render :show, status: :created, location: @borrowing }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @borrowing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /borrowings/1 or /borrowings/1.json
  def update
    respond_to do |format|
      if @borrowing.update(borrowing_params)
        format.html { redirect_to @borrowing, notice: "Borrowing was successfully updated." }
        format.json { render :show, status: :ok, location: @borrowing }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @borrowing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /borrowings/1 or /borrowings/1.json
  def destroy
    @borrowing.destroy
    respond_to do |format|
      format.html { redirect_to borrowings_url, notice: "Borrowing was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_borrowing
      @borrowing = Borrowing.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def borrowing_params
      params.require(:borrowing).permit(:installment_plan, :interest_rate, :status, :amount, :total, :borrower_id)
    end
end
