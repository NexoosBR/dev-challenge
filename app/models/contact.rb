class Contact < ApplicationRecord
  validates :contact, :contact_type, presence: true
  belongs_to :contactable, polymorphic: true
  enum contact_type: { telefone: 0, email: 5 }
end
