class GenerateInstallments
  attr_reader :loan

  def initialize(loan)
    @loan = loan
  end

  def calculate_pmt
    (@loan.value * ((((1 + @loan.rate) ** @loan.number_installments) * @loan.rate) / (
              ((1 + @loan.rate) ** @loan.number_installments) - 1))).round()
  end

  def generate_installments
    pmt = calculate_pmt()
    @loan.update_attribute(:pmt, pmt)
    today = Date.today
    for i in 0..@loan.number_installments
      Installment.create(value: pmt, 
                        loan: @loan, 
                        company: @loan.company, 
                        due_date: today + i.month)
    end
  end
end