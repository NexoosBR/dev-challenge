class AddTotalToCreditRequest < ActiveRecord::Migration[6.0]
  def change
    add_column :credit_requests, :total, :float
  end
end
