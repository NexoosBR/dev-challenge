class PhonePresenter < SimpleDelegator
  include ActiveSupport::NumberHelper

  def number
    number_to_phone(
      super,
      pattern: pattern_for(super),
      area_code: true
    )
  end

  private

  def cellphone?(number)
    number.to_s.size == 11
  end

  def pattern_for(number)
    cellphone?(number) ? /(\d{1,2})(\d{5})(\d{4})$/ : /(\d{1,2})(\d{4})(\d{4})$/
  end
end
