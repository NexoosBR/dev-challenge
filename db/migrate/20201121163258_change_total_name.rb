class ChangeTotalName < ActiveRecord::Migration[6.0]
  def change
    rename_column :credit_requests, :total, :monthly_value
  end
end
