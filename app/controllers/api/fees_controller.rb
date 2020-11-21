module Api
  class FeesController < ApplicationController
    def verify_fee_by_period
      current_fee = verifier.verify_by_period(params[:period])
      render json: {current_fee: current_fee}
    end

    private

    def verifier
      MonthlyFeeVerifier.new
    end
  end
end
