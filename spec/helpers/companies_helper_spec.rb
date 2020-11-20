require "rails_helper"

describe CompaniesHelper do
  context 'When listing companies with an empty array' do
    it 'does return no companies message' do
      expect(helper.list_companies([])).to eq('<p>Nenhuma empresa cadastrada!</p>')
    end
  end

  context 'When listing companies with some content' do
    it 'does return a list of companies correctly' do
      company = build(:company, name: 'Globo')
      another_company = build(:company, name: 'Band')

      subject = helper.list_companies([company, another_company])

      expect(subject).to include("<li>#{company.name}</li>")
      expect(subject).to include("<li>#{another_company.name}</li>")
    end
  end
end
