module Docs
  class Clients < ClientsController
    extend Apipie::DSL::Concern

    error 500, 'Server crashed for some reason.'
    error :unprocessable_entity, 'Could not creates the entity.'

    api :GET, 'clients', 'List of clients'
    returns code: 200
    def index; end

    def_param_group :create do
      param :name, String
      param :cnpj, String
      param :addresses_attributes, Array
      param :phones_attributes, Array
    end
    api :POST, 'clients', 'Create a client'
    returns code: 200
    returns code: :unprocessable_entity
    param_group :create
    def create; end
  end
end
