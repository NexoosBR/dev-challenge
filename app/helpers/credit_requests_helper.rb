module CreditRequestsHelper
  def available_periods
    MonthlyFeeVerifier.new.available_periods
  end
end
