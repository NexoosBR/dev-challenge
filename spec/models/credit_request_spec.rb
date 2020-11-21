require 'rails_helper'

RSpec.describe CreditRequest, type: :model do
  context 'When approving a request' do
    it 'does update status' do
      request = create(:credit_request, status: :awaiting_approval)

      request.approve

      expect(request).to be_approved
    end
  end

  context 'When denying a request' do
    it 'does update status' do
      request = create(:credit_request, status: :awaiting_approval)

      request.deny

      expect(request).to be_denied
    end
  end
end
