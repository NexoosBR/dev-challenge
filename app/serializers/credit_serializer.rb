class CreditSerializer < ActiveModel::Serializer
  attributes :amount, :interest
  has_many :installments, serializer: InstallmentSerializer
end
