Rails.application.routes.draw do
  apipie
  resources :clients, only: %i[index create]
  resources :credits, only: %i[index create]
  resources :loans, only: %i[create]
end
