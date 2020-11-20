module CompaniesHelper
  def list_companies(companies)
    return empty_content if companies.empty?

    view_data = companies_list_title

    companies.each do |company|
      view_data += content_tag(:li, company.name)
    end

    view_data.html_safe
  end

  private

  def empty_content
    content_tag(:p, 'Nenhuma empresa cadastrada!')
  end

  def companies_list_title
    content_tag(:h3, 'Empresas cadastradas')
  end
end
