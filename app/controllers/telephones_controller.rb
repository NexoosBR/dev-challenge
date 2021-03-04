class TelephonesController < ApplicationController
  before_action :set_telephone, only: %i[ show edit update destroy ]

  # GET /telephones or /telephones.json
  def index
    @telephones = Telephone.all
  end

  # GET /telephones/1 or /telephones/1.json
  def show
  end

  # GET /telephones/new
  def new
    @telephone = Telephone.new
  end

  # GET /telephones/1/edit
  def edit
  end

  # POST /telephones or /telephones.json
  def create
    @telephone = Telephone.new(telephone_params)

    respond_to do |format|
      if @telephone.save
        format.html { redirect_to @telephone, notice: "Telephone was successfully created." }
        format.json { render :show, status: :created, location: @telephone }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @telephone.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /telephones/1 or /telephones/1.json
  def update
    respond_to do |format|
      if @telephone.update(telephone_params)
        format.html { redirect_to @telephone, notice: "Telephone was successfully updated." }
        format.json { render :show, status: :ok, location: @telephone }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @telephone.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /telephones/1 or /telephones/1.json
  def destroy
    @telephone.destroy
    respond_to do |format|
      format.html { redirect_to telephones_url, notice: "Telephone was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_telephone
      @telephone = Telephone.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def telephone_params
      params.require(:telephone).permit(:area_code, :phone_type, :phone_number, :loan_applicant_id)
    end
end
