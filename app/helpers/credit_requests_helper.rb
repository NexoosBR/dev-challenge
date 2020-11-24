module CreditRequestsHelper
  def available_periods
    MonthlyFeeVerifier.new.available_periods
  end

  def list_payments(credit_request)
    return render('no_payment_found') if credit_request.payments.empty?
    render('payment_list')
  end

  def show_approve_button_for(credit_request)
    return unless credit_request.awaiting_approval?

    link_to(
      'Aprovar',
      approve_credit_request_path(credit_request),
      { method: :put, class: 'btn btn-success' }
    )
  end

  def show_deny_button_for(credit_request)
    return unless credit_request.awaiting_approval?

    link_to(
      'Reprovar',
      deny_credit_request_path(credit_request),
      { method: :put, class: 'btn btn-danger' }
    )
  end
end
