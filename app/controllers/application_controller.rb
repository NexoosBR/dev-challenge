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
      if devise_controller? && !devise_registration_edit_view?
        'login'
      else
        'application'
      end
    end

    def devise_registration_edit_view?
      request.fullpath.match?('/managers/edit') || (request.fullpath.match('/managers') && params[:action] == 'update')
    end
end
