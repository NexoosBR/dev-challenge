class CompaniesController < ApplicationController

  def new
    @company = Company.new
  end

  def create
    company = Company.new(company_params)

    if company.save
      flash[:success] = 'Empresa cadastrada com sucesso.'
      redirect_to company
    else
      flash[:error] = "Ocorreu um erro: #{company.errors.messages}"
      redirect_to new_company_path
    end
  end

  def show
    @company = Company.find(params[:id])
  end

  def new_credit_request
    @company = Company.find(params[:id])
    @request = CreditRequest.new
  end

  def new_phone
    @company = Company.find(params[:id])
    @phone = Phone.new
  end

  def new_address
    @company = Company.find(params[:id])
    @address = Address.new
  end

  private

  def company_params
    params.require(:company).permit(:name, :cnpj)
  end
end
