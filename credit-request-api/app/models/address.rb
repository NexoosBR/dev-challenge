class Address < ActiveRecord::Base
  belongs_to :client

  validates :value, presence: true
end
