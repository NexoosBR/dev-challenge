class AddressesController < ApplicationController
  before_action :set_address, only: [:show, :edit, :update, :destroy]

  # GET /addresses
  def index
    @addresses = current_company.addresses.all
  end

  # GET /addresses/1
  def show
  end

  # GET /addresses/new
  def new
    @address = current_company.addresses.new
  end

  # GET /addresses/1/edit
  def edit
  end

  # POST /addresses
  def create
    @address = current_company.addresses.new(address_params)

    if @address.save
      redirect_to @address, notice: t(:created, model: t(:addresses, scope: 'activerecord.models'))
    else
      render :new
    end
  end

  # PATCH/PUT /addresses/1
  def update
    if @address.update(address_params)
      redirect_to @address, notice: t(:updated, model: t(:addresses, scope: 'activerecord.models'))
    else
      render :edit
    end
  end

  # DELETE /addresses/1
  def destroy
    @address.destroy
    redirect_to addresses_url, notice: t(:deleted, model: t(:addresses, scope: 'activerecord.models'))
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_address
      @address = Address.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def address_params
      params.require(:address).permit(:country, :state, :city, :neighborhood, :street, :number, :zipcode)
    end
end
