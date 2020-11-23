class PaymentsGenerator
  def generate_for_credit_request(credit_request)
    payment_dates_for(credit_request).map do |date|
      credit_request.payments.create(amount: credit_request.monthly_value, due_date: date, status: :charged)
    end
  end

  private

  def payment_dates_for(credit_request)
    dates = [Date.current]

    credit_request.periods.times{dates << dates.last + 1.month}

    dates.drop(1)
  end
end
