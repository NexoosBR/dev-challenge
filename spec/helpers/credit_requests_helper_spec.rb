require "rails_helper"

describe CreditRequestsHelper do
  context 'When checking available periods' do
    it 'does call verifier correctly' do
      expected_response = [1,2,3]
      allow_any_instance_of(MonthlyFeeVerifier)
        .to receive(:available_periods)
          .and_return(expected_response)

      subject = helper.available_periods

      expect(subject).to eq(expected_response)
    end
  end
end
