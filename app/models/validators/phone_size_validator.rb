module Validators
  class PhoneSizeValidator < ActiveModel::Validator
    VALID_SIZES = [11, 10]

    def validate(record)
      if invalid_number_size?(record)
        record.errors.add(:number, "Precisa ser um celular ou fixo com DDD, apenas os números")
      end
    end

    private

    def number_size(record)
      record.number.to_s.size
    end

    def invalid_number_size?(record)
      !VALID_SIZES.include?(
        number_size(record)
      )
    end
  end
end
