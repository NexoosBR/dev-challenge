module Api
  class CreditRequestsController < ApplicationController
    def calculate_pmt
      render json: {
        monthly_value: Calculators::Generic.new(pmt_calculator).calculate
      }
    end

    private

    def pmt_calculator
      Calculators::Pmt.new(pmt_calculation_data)
    end

    def pmt_calculation_data
      {
        amount: params[:amount].to_f,
        monthly_fee: params[:monthly_fee].to_f,
        periods: params[:periods].to_f,
      }
    end
  end
end
