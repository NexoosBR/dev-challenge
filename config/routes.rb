Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :v1, format: :json do
    resources :clients, only: %i[create show] do
      resources :credits, only: :create
    end
  end
  root 'pages#index'
  get '*all', to: 'pages#index'
end
