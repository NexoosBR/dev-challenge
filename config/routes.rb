Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'

  devise_for :companies

  resources :loans

  resources :phone_numbers
  resources  :addresses
end
