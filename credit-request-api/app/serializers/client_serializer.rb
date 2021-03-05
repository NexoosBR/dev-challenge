class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :cnpj, :addresses, :phones

  def addresses
    object.addresses.map do |address|
      AddressSerializer.new(address)
    end
  end

  def phones
    object.phones.map do |phone|
      PhoneSerializer.new(phone)
    end
  end
end
