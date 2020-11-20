class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.references :credit_request, null: false, foreign_key: true
      t.float :amount
      t.date :due_date
      t.integer :status

      t.timestamps
    end
  end
end
