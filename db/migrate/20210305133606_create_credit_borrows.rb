class CreateCreditBorrows < ActiveRecord::Migration[5.2]
  def change
    create_table :credit_borrows do |t|
      t.decimal :amount
      t.integer :status
      t.references :borrower, foreign_key: true

      t.timestamps
    end
  end
end
