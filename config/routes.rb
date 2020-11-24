Rails.application.routes.draw do
  root to: "home#index"

  resources :credit_requests, only: [:show, :create] do
    member do
      put 'approve', to: 'credit_requests#approve'
      put 'deny', to: 'credit_requests#deny'
    end
  end

  namespace :api do
    get 'calculate_pmt', to: 'credit_requests#calculate_pmt'
  end

  resources :companies, only: [:show, :new, :create] do
    member do
      get 'new_credit_request', to: 'companies#new_credit_request'
      get 'new_phone', to: 'companies#new_phone'
      get 'new_address', to: 'companies#new_address'
    end
  end

  resources :addresses, only: [:create]
  resources :phones, only: [:create]
end
