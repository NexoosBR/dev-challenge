module CompaniesHelper
  def list_companies(companies)
    return render_no_company if companies.empty?

    render('companies/companies_list')
  end

  def show_company_requests(company)
    return render_no_content_found if company.credit_requests.empty?

    render('credit_requests')
  end

  def show_addresses(company)
    return render_no_content_found if company.addresses.empty?

    render('addresses')
  end

  def show_phones(company)
    return render_no_content_found if company.phones.empty?

    render('phones')
  end
  private

  def render_no_content_found
    render('no_content_found')
  end

  def render_no_company
    render('no_company_found')
  end
end
