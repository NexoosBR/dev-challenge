Rails.application.routes.draw do
  devise_for :companies

  root to: 'home#index'

  resources :company_profiles, only: %i[show new create] do
    resources :proposals, only: %i[new create]
  end

  resources :proposals, only: %i[show]
end
