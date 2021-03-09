class InstallmentService
  def initialize(borrowing)
    @borrowing = borrowing
  end

  def call
    installment_plan = @borrowing.installment_plan
    installment_amount = @borrowing.installment_amount

    (1..installment_plan).each do |number|
      due_at = DateTime.now >> number
      Installment.create!(number: number, amount: installment_amount, 
        due_at: due_at, borrowing: @borrowing)
    end
  end
end