module Calculators
  module DataValidators
    class Pmt
      REQUIRED_KEYS = %i(amount periods monthly_fee)

      def valid_data?(...)
         all_present?(...) && numeric_data?(...)
      end

      private
      def numeric_data?(data)
        REQUIRED_KEYS.map do |key|
          data[key].is_a?(Numeric)
        end.all?
      end

      def all_present?(data)
        REQUIRED_KEYS.map do |key|
          data[key].present?
        end.all?
      end
    end
  end
end
