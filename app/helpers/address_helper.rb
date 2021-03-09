module AddressHelper
  def full_address(address)
    "#{address.address}, #{address.neighborhood}, 
      #{address.city}/#{address.fed_unit} - #{address.zipcode}"
  end
end