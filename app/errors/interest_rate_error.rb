class InterestRateError < StandardError
  def initialize(message="The interest rate is not valid")
    super(message)
  end
end