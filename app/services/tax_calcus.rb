class TaxCalcus
  attr_reader :proposal

  def initialize(proposal)
    @proposal = proposal
  end

  def calculate
    pmt = @proposal.value * ((((1 + @proposal.tax) ** @proposal.installments) * @proposal.tax) / (((1 + @proposal.tax) ** @proposal.installments) - 1))
    pmt = pmt.round()
    create_installments(pmt, @proposal)
  end

  def create_installments(pmt, proposal)
    index = 1
    expiration = proposal.expiration
    while index <= proposal.installments
      Installment.create(installment_index: index, value: pmt,
                         expiration: expiration, proposal: proposal)
      index = index + 1
      expiration = expiration.next
    end
  end
end