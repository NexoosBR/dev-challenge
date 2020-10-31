Rails.application.routes.draw do
  root to: 'loans#index'

  devise_for :companies

  resources :loans
  resources :phone_numbers
end
