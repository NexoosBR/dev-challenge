class PhonesController < ApplicationController
  def create
    phone = Phone.new(phone_params)

    if phone.save
      flash[:success] = 'Telefone adicionado.'
      redirect_to phone.company
    else
      flash[:error] = "Ocorreu um erro: #{phone.errors.messages}"
      redirect_to new_phone_company_path(phone.company_id)
    end
  end

  private

  def phone_params
    params.require(:phone).permit(:street, :number, :company_id)
  end
end
