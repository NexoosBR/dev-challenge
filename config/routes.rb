Rails.application.routes.draw do
  root to: "home#index"

  resources :credit_requests, only: [:show, :create]

  resources :companies, only: [:show] do
    member do
      get 'new_credit_request', to: 'companies#new_credit_request'
    end
  end
end
