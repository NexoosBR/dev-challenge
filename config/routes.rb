Rails.application.routes.draw do

  root to: 'home#index'
  
  # get "400", :to => 
  # get "404", :to => "errors#not_found"
  # get "500", :to => "errors#internal_server_error"

  match "/400", to: "errors#bad_request", via: :all
  match "/404", to: "errors#not_found", via: :all
  match "/500", to: "errors#internal_server_error", via: :all

  resources :borrowers do
    resources :borrowings, shallow: true
    resources :credit_borrows, shallow: true
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
