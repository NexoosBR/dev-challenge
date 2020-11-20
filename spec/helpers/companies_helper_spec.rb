require "rails_helper"

describe CompaniesHelper do
  context 'When listing companies with an empty array' do
    it 'does return no companies message' do
      expect(helper.list_companies([])).to include('<p>Nenhuma empresa encontrada.</p>')
    end
  end

  context 'When listing companies with some content' do
    it 'does return a list of companies correctly' do
      company = build(:company, name: 'Globo')
      another_company = build(:company, name: 'Band')
      fake_partial = '<h1>Fake Content<h2>'
      allow(helper).to receive(:render).with('companies/companies_list').and_return(fake_partial)

      subject = helper.list_companies([company, another_company])

      expect(subject).to include(fake_partial)
    end
  end

  context 'When trying to show company requests, but there is not requests' do
    it 'does render no credit requests found' do
      company = build(:company)
      subject = helper.show_company_requests(company)

      expect(subject).to include('Esta empresa não possui nenhuma solicitação de crédito.')
    end
  end

  context 'When showing company requests' do
    it 'does render a list of requests' do
      company = create(:company)
      request = create(:credit_request, company: company)
      another_request = create(:credit_request, company: company)
      fake_partial = '<h1>Fake Content<h2>'
      allow(helper).to receive(:render).with('credit_requests').and_return(fake_partial)

      subject = helper.show_company_requests(company)

      expect(subject).to include(fake_partial)
    end
  end
end
