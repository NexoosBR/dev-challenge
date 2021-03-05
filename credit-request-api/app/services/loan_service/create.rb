module LoanService
  class Create
    attr_accessor :loan

    def initialize(params)
      @params  = params
      @preview = ['true', ''].include?(@params[:preview]&.to_s)
      @success = false
    end

    def execute
      @credit = Credit.find_by(id: @params[:credit_id])
      return set_default_error if @credit.blank?

      set_loan_default
      @loan.assign_attributes(installments_attributes: installments_attributes)

      @loan.total = @loan.installments.sum(&:value).round(5)
      @success = @loan.valid?
      @loan.save unless @preview

      self
    end

    def success?
      @success
    end

    private

    def installments_attributes
      @loan.subdivision.times.map do |idx|
        {
          payday: next_payday(idx + 1),
          value: value_per_installment.round(5)
        }
      end
    end

    def next_payday(idx)
      payday = Date.today + idx.month

      if [6, 0].include?(payday.wday)
        payday.next_occurring(:monday)
      else
        payday
      end
    end

    def value_per_installment
      @loan.value * ((((1 + @loan.interest)**@loan.subdivision) * @loan.interest) /
                     (((1 + @loan.interest)**@loan.subdivision) - 1))
    end

    def set_loan_default
      @loan = Loan.new
      @loan.client_id = @params[:client_id]
      @loan.credit_id = @params[:credit_id]
      @loan.value = @params[:value] || 0
      @loan.interest = @params[:interest] || 0
      @loan.subdivision = @params[:subdivision] || 0
    end

    def set_default_error
      @loan = Loan.new
      @success = @loan.valid?

      self
    end
  end
end
