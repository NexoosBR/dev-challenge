module Api
  class CreditRequestsController < ApplicationController
    def calculate_pmt
      render json: {
        monthly_value: pmt_value,
        monthly_fee: monthly_fee
      }
    end

    private

    def pmt_value
      Calculators::Generic.new.calculate(
        amount,
        monthly_fee,
        periods,
        Calculators::Pmt.new
      )
    end

    def monthly_fee
      MonthlyFeeVerifier.new.verify_by_period(params[:periods])
    end

    def amount
      params[:amount].to_f
    end

    def periods
      params[:periods].to_f
    end
  end
end
