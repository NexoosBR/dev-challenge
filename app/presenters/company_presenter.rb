class CompanyPresenter < SimpleDelegator
  def credit_requests
    super.map do |request|
      CreditRequestPresenter.new(request)
    end
  end

  def phones
    super.map do |phone|
      PhonePresenter.new(phone)
    end
  end
end
