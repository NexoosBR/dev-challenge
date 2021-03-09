class AmountError < StandardError
  def initialize(message="The amount is not valid")
    super(message)
  end
end