module Loan
  class Calculator
    attr_reader :amount, :installments, :interest

    def initialize(amount:, installments:, interest:)
      @amount = amount.to_i
      @installments = installments.to_i
      @interest = interest.to_f / 100
    end

    def self.call(**args)
      new(**args).call
    end

    def call
      parcel_amount = amount * ((compound_interest * interest) / (compound_interest - 1))
      parcel_amount.ceil
    end

    private

    def compound_interest
      @compound_interest ||= (1 + interest)**installments
    end
  end
end
