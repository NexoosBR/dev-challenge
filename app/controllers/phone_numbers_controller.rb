class PhoneNumbersController < ApplicationController
  before_action :set_phone_number, only: [:show, :edit, :update, :destroy]

  # GET /phone_numbers
  def index
    @phone_numbers = current_company.phone_numbers.all
  end

  # GET /phone_numbers/1
  def show
  end

  # GET /phone_numbers/new
  def new
    @phone_number = current_company.phone_numbers.new
  end

  # GET /phone_numbers/1/edit
  def edit
  end

  # POST /phone_numbers
  def create
    @phone_number = current_company.phone_numbers.new(phone_number_params)

    if @phone_number.save
      redirect_to @phone_number, notice: t(:created, model: t(:phone_number, scope: 'activerecord.models'))
    else
      render :new
    end
  end

  # PATCH/PUT /phone_numbers/1
  def update
    if @phone_number.update(phone_number_params)
      redirect_to @phone_number, notice: t(:updated, model: t(:phone_number, scope: 'activerecord.models'))
    else
      render :edit
    end
  end

  # DELETE /phone_numbers/1
  def destroy
    @phone_number.destroy
    redirect_to phone_numbers_url, notice: t(:deleted, model: t(:phone_number, scope: 'activerecord.models'))
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_phone_number
      @phone_number = PhoneNumber.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def phone_number_params
      params.require(:phone_number).permit(:number, :company_id)
    end
end
