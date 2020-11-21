Rails.application.routes.draw do
  root to: "home#index"

  resources :credit_requests, only: [:show, :create] do
    member do
      put 'approve', to: 'credit_requests#approve'
    end
  end

  namespace :api do
    get 'calculate_pmt', to: 'credit_requests#calculate_pmt'
  end

  resources :companies, only: [:show] do
    member do
      get 'new_credit_request', to: 'companies#new_credit_request'
    end
  end
end
