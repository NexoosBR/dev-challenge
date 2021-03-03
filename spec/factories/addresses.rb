FactoryBot.define do
  factory :address do
    cep        { '08275080' }
    street     { 'Rua das Flores' }
    state      { 'SP' }
    city       { 'São Paulo' }
    number     { 591 }
    complement { '' }
    client
  end
end
