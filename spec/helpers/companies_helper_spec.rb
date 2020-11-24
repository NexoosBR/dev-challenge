require "rails_helper"

describe CompaniesHelper do
  context 'When listing companies with an empty array' do
    it 'does return no companies message' do
      expect(helper.list_companies([])).to include('<p>Nenhuma empresa encontrada.</p>')
    end
  end

  context 'When listing companies with some content' do
    it 'does render the right partial' do
      companies = [ build(:company, name: 'Globo') ]
      fake_partial = '<h1>Fake Content<h2>'
      allow(helper).to receive(:render).with('companies/companies_list').and_return(fake_partial)

      subject = helper.list_companies(companies)

      expect(subject).to include(fake_partial)
    end
  end

  context 'When trying to show company requests, but there is not requests' do
    it 'does render no credit requests found' do
      company = build(:company)
      subject = helper.show_company_requests(company)

      expect(subject).to include('Nenhum conteúdo encontrado')
    end
  end

  context 'When trying to show telephones, but there is not anyone' do
    it 'does render no credit requests found' do
      company = build(:company)
      subject = helper.show_phones(company)

      expect(subject).to include('Nenhum conteúdo encontrado')
    end
  end

  context 'When trying to show addresses, but there is not anyone' do
    it 'does render no credit requests found' do
      company = build(:company)
      subject = helper.show_addresses(company)

      expect(subject).to include('Nenhum conteúdo encontrado')
    end
  end

  context 'When showing addresses' do
    it 'does render tha right partial' do
      company = create(:company)
      create(:address, company: company)
      fake_partial = '<h1>Fake Content<h2>'
      allow(helper).to receive(:render).with('addresses').and_return(fake_partial)

      subject = helper.show_addresses(company)

      expect(subject).to include(fake_partial)
    end
  end

  context 'When showing phones' do
    it 'does render a list of requests' do
      company = create(:company)
      create(:phone, company: company)    
      fake_partial = '<h1>Fake Content<h2>'
      allow(helper).to receive(:render).with('phones').and_return(fake_partial)

      subject = helper.show_phones(company)

      expect(subject).to include(fake_partial)
    end
  end
end
