require 'rails_helper'

describe Docs::Clients, type: :service do
  before do
    Docs::Clients.new
  end
end
