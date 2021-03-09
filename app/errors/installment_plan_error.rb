class InstallmentPlanError < StandardError
  def initialize(message="The installment plan is not valid")
    super(message)
  end
end