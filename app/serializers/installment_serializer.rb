class InstallmentSerializer < ActiveModel::Serializer
  attributes :amount, :parcel, :status, :due_date

  def status
    I18n.t("activerecord.attributes.installment.statuses.#{object.status}")
  end
end
