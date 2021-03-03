class ClientSerializer < ActiveModel::Serializer
  attributes :name, :cnpj, :phones
  has_many :addresses, serializer: AddressSerializer
end
