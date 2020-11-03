class ApplicationController < ActionController::Base
  before_action :authenticate_company!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    layout :layout_by_resource

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation, :cnpj, phone_number: [:number]])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :password, :password_confirmation, :cnpj, phone_number: [:number]])
    end

  private
    def layout_by_resource
      if devise_controller? && !request.fullpath.match?('/companies/edit')
        'login'
      else
        'application'
      end
    end
end
