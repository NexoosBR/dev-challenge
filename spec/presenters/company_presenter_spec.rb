require "rails_helper"

describe CompanyPresenter do
  context 'When presenting the credit_requests' do
    it 'does return correctly' do
      company = create(:company)
      create_list(:credit_request, 10, company: company)

      subject = described_class.new(company)

      expect(subject.credit_requests).to be_a(Array)
      expect(subject.credit_requests.count).to eq(10)
      expect(subject.credit_requests.last).to be_a(CreditRequestPresenter)
    end
  end
end
