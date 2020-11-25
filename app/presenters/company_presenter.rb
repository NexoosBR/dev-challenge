class CompanyPresenter < SimpleDelegator
  def credit_requests
    super.map do |request|
      CreditRequestPresenter.new(request)
    end
  end
end
