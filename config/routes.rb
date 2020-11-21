Rails.application.routes.draw do
  root to: "home#index"

  resources :credit_requests, only: [:show, :create]

  namespace :api do
    get 'fee_by_period', to: 'fees#verify_fee_by_period'
    get 'calculate_pmt', to: 'credit_requests#calculate_pmt'
  end

  resources :companies, only: [:show] do
    member do
      get 'new_credit_request', to: 'companies#new_credit_request'
    end
  end
end
