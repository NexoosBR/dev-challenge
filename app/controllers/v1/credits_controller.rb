module V1
  class CreditsController < ApiController
    def create
      client = Client.find_id_or_cnpj!(params[:client_id])
      credit = Loan::Creator.call(client, permitted_params)
      render json: credit, status: :created
    end

    def calculate
      parcel_amount = Loan::Calculator.call(**permitted_params.to_hash.symbolize_keys)

      render json: { parcel_amount: parcel_amount }, status: :ok
    end

    private

    def permitted_params
      params.require(:credit).permit(:amount, :installments, :interest)
    end
  end
end
