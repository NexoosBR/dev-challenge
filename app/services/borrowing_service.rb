class BorrowingService
  def initialize(borrowing)
    borrowing_attrs = borrowing.attributes.slice("amount", "installment_plan", "interest_rate")
    
    @amount = borrowing_attrs["amount"]
    @interest_rate = borrowing_attrs["interest_rate"]
    @installment_plan = borrowing_attrs["installment_plan"]
  end

  def call
    
    raise AmountError.new if @amount.blank? || @amount < 1  
    raise InterestRateError.new if @interest_rate.blank? || @interest_rate < 0
    raise InstallmentPlanError.new if @installment_plan.blank? || @installment_plan < 1 

    rate = @interest_rate.fdiv(100)
    
    @amount * ((((1 + rate) ** @installment_plan) * rate) / (((1 + rate) ** @installment_plan) - 1))
  end
end