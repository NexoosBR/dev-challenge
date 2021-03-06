class CreateLoans < ActiveRecord::Migration[6.0]
  def change
    create_table :loans do |t|
      t.decimal :value, precision: 8, scale: 2
      t.integer :installment_count
      t.decimal :interest, precision: 4, scale: 2
      t.integer :loan_request_id

      t.timestamps
    end
  end
end
