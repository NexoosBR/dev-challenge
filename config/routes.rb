Rails.application.routes.draw do
  devise_for :companies
  root to: 'home#index'
end
