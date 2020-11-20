module CompaniesHelper
  def list_companies(companies)
    return render_no_company if companies.empty?

    render('companies/companies_list')
  end

  def show_company_requests(company)
    return render_no_credit_requests if company.credit_requests.empty?

    render('credit_requests')
  end
  private

  def render_no_credit_requests
    render('no_credit_request_found')
  end

  def render_no_company
    render('no_company_found')
  end
end
