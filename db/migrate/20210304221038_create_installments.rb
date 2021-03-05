class CreateInstallments < ActiveRecord::Migration[5.2]
  def change
    create_table :installments do |t|
      t.integer :number, null: false
      t.decimal :amount, null: false
      t.datetime :due_at, null: false
      t.references :borrowing, foreign_key: true

      t.timestamps
    end
  end
end
