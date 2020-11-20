class AddStatusToCreditRequest < ActiveRecord::Migration[6.0]
  def change
    add_column :credit_requests, :status, :integer
  end
end
