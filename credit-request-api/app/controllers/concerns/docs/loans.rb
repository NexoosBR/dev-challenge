module Docs
  class Loans < LoansController
    extend Apipie::DSL::Concern

    error 500, 'Server crashed for some reason.'
    error :unprocessable_entity, 'Could not creates the entity.'

    def_param_group :create do
      param :client_id, String
      param :credit_id, String
      param :interest, String
      param :preview, String
      param :subdivision, String
      param :value, String
    end
    api :POST, 'loans', 'Create a loan'
    returns code: 200
    returns code: :unprocessable_entity
    param_group :create
    def create; end
  end
end
