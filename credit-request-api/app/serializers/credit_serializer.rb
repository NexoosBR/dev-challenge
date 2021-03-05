class CreditSerializer < ActiveModel::Serializer
  attributes :id, :value, :remain, :created_at

  def created_at
    object.created_at.to_date
  end
end
