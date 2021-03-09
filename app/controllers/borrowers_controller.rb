class BorrowersController < ApplicationController
  before_action :set_borrower, only: %i[ show edit update destroy ]

  # GET /borrowers or /borrowers.json
  def index
    @borrowers = Borrower.all
  end

  # GET /borrowers/1 or /borrowers/1.json
  def show
  end

  # GET /borrowers/new
  def new
    @borrower = Borrower.new
    
    Address.kinds.map do
      @borrower.addresses.build
    end   
  end

  # GET /borrowers/1/edit
  def edit
  end

  # POST /borrowers or /borrowers.json
  def create
    @borrower = Borrower.new(borrower_params)
    ap @borrower.addresses
    respond_to do |format|
      if @borrower.save
        format.html { redirect_to @borrower, notice: "Borrower was successfully created." }
        format.json { render :show, status: :created, location: @borrower }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @borrower.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /borrowers/1 or /borrowers/1.json
  def update
    respond_to do |format|
      if @borrower.update(borrower_params)
        format.html { redirect_to @borrower, notice: "Borrower was successfully updated." }
        format.json { render :show, status: :ok, location: @borrower }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @borrower.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /borrowers/1 or /borrowers/1.json
  def destroy
    @borrower.destroy
    respond_to do |format|
      format.html { redirect_to borrowers_url, notice: "Borrower was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_borrower
      @borrower = Borrower.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def borrower_params
      params.require(:borrower).permit(:company_name, :company_number, 
        :company_phone, :owner_phone, addresses_attributes: [
          :kind, :address, :neighborhood, :city, :fed_unit, :zipcode
        ])
    end
end
