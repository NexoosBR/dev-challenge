Rails.application.routes.draw do
  root to: "home#index"

  resources :companies, only: [:show]
  resources :credit_requests, only: [:show]
end
