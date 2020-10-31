Rails.application.routes.draw do
  devise_for :companies

  root to: 'home#index'

  resources :company_profiles, only: %i[show new create edit update] do
    resources :addresses, only: %i[new create]
    resources :contacts, only: %i[new create]
  end

  resources :proposals, only: %i[show new create]
end
