Rails.application.routes.draw do
  devise_for :companies

  root to: 'home#index'

  resources :company_profiles, only: %i[show new create]

  resources :proposals, only: %i[show new create]
end
