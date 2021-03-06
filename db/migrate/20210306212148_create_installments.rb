class CreateInstallments < ActiveRecord::Migration[6.0]
  def change
    create_table :installments do |t|
      t.date :billing_date
      t.decimal :value, precision: 8, scale: 2
      t.integer :loan_id

      t.timestamps
    end
  end
end
