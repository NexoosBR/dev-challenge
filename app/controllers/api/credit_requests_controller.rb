module Api
  class CreditRequestsController < ApplicationController
    def calculate_pmt
      render json: {
        monthly_value: Calculators::Generic.new(pmt_calculator).calculate,
        monthly_fee: monthly_fee
      }
    end

    private

    def pmt_calculator
      Calculators::Pmt.new(pmt_calculation_data)
    end

    def pmt_calculation_data
      {
        amount: params[:amount].to_f,
        monthly_fee: monthly_fee,
        periods: params[:periods].to_f,
      }
    end

    def monthly_fee
      MonthlyFeeVerifier.new.verify_by_period(params[:periods])
    end
  end
end
