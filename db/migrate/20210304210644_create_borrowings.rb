class CreateBorrowings < ActiveRecord::Migration[5.2]
  def change
    create_table :borrowings do |t|
      t.integer :installment_plan, null:false, default: 1
      t.decimal :interest_rate, null: false
      t.integer :status, default: 0
      t.decimal :amount, null: false
      t.decimal :total, null: false
      t.references :borrower, foreign_key: true

      t.timestamps
    end
  end
end
