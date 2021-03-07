module Loan
  class Creator
    attr_reader :client, :amount, :installments, :interest

    def initialize(client, params)
      @client = client
      @amount = params[:amount].to_f
      @installments = params[:installments].to_i
      @interest = params[:interest].to_f
    end

    def self.call(*args)
      new(*args).call
    end

    def call
      parcel_amount = Calculator.call(amount: amount, installments: installments, interest: interest)
      client_installments = build_installments(parcel_amount)

      client.credits.create!(amount: amount, interest: interest, installments: client_installments)
    end

    private

    def build_installments(parcel_amount)
      [*1..installments].map do |parcel_number|
        Installment.new(parcel: parcel_number, amount: parcel_amount, due_date: parcel_number.month.from_now)
      end
    end
  end
end
