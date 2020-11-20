class CreateCreditRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :credit_requests do |t|
      t.references :company, null: false, foreign_key: true
      t.float :amount

      t.timestamps
    end
  end
end
