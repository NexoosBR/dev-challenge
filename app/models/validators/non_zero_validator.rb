module Validators
  class NonZeroValidator < ActiveModel::Validator
    def validate(record)
      if record.amount == 0
        record.errors.add(:amount, "precisa ser maior que zero.")
      end
    end
  end
end
