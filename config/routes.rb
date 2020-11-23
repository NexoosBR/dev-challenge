Rails.application.routes.draw do
  devise_for :users
  resources :companies, except: [:show] do
    resources :solicitations, except: [:show] do
        get '/installments', to: 'solicitations#show_installments', as: 'installments'
    end
  end
  root 'companies#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
