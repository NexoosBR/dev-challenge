module Docs
  class Credits < CreditsController
    extend Apipie::DSL::Concern

    error 500, 'Server crashed for some reason.'
    error :unprocessable_entity, 'Could not creates the entity.'

    def_param_group :index do
      param :client_id, String
    end
    api :GET, 'credits', 'List of credits'
    returns code: 200
    param_group :index
    def index; end

    def_param_group :create do
      param :client_id, String
      param :value, String
    end
    api :POST, 'credits', 'Create a credit'
    returns code: 200
    returns code: :unprocessable_entity
    param_group :create
    def create; end
  end
end
