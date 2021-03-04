module V1
  class CreditsController < ApiController
    def create
      client = Client.find_id_or_cnpj!(params[:client_id])
      credits = client.credits.create!(permitted_params)
      render json: credits, status: :created
    end

    private

    def permitted_params
      params.require(:credit).permit(:amount)
    end
  end
end
