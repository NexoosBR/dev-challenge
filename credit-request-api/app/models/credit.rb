class Credit < ActiveRecord::Base
  belongs_to :client
  has_many :loans

  before_validation :ensure_remain_value, on: :create

  validates :value, numericality: { greater_than: 0 }
  validates :remain, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: :value }

  scope :active, lambda {
    where('remain > ?', 0)
  }

  private

  def ensure_remain_value
    self.remain ||= value
  end
end
