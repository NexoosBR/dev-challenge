Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post :applicants, to: 'applicants#create'

      post :addresses, to: 'addresses#create'

      post :phones, to: 'phones#create'
    end
  end
end
