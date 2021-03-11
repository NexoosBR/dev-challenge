module EnumI18nHelper

  # Returns an array of the possible key/i18n values for the enum
  def enum_options_for_select(class_name, enum)
    class_name.send(enum.to_s.pluralize).map do |key, _|
      [enum_i18n(class_name, enum, key), key]
    end
  end

  # Returns the i18n version the models current enum key
  def enum_l(model, enum)
    enum_i18n(model, enum, model.send(enum))
  end

  # Returns the i18n string for the enum key
  def enum_i18n(model_name, enum, key)
    I18n.t("activerecord.enums.#{model_name.model_name.i18n_key}.#{enum.to_s.pluralize}.#{key}")
  end
end