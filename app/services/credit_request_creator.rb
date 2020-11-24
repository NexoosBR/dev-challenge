class CreditRequestCreator
  def call(amount, periods, company_id)
    credit_request = CreditRequest.create(
      amount:        amount,
      periods:       periods,
      company_id:    company_id,
      monthly_fee:   calculate_fee(periods),
      monthly_value: calculate_pmt(amount, periods),
      status: 0,
    )
  end

  private

  def calculate_fee(periods)
    @fee ||= MonthlyFeeVerifier.new.verify_by_period(periods)
  end

  def calculate_pmt(amount, periods)
    Calculators::Generic.new.calculate(
      amount,
      calculate_fee(periods),
      periods,
      Calculators::Pmt.new
    )
  end
end
