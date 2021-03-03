class AddressSerializer < ActiveModel::Serializer
  attributes :cep, :street, :state, :city, :number, :complement
end
