class AddMonthlyFeeToCreditRequest < ActiveRecord::Migration[6.0]
  def change
    add_column :credit_requests, :monthly_fee, :float
  end
end
