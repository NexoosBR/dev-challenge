class HomeController < ApplicationController
  skip_before_action :authenticate_company!, only: [:index]
  def index
  end
end
