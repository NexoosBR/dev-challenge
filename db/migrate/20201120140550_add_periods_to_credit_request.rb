class AddPeriodsToCreditRequest < ActiveRecord::Migration[6.0]
  def change
    add_column :credit_requests, :periods, :integer
  end
end
