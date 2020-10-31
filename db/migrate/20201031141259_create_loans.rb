class CreateLoans < ActiveRecord::Migration[6.0]
  def change
    create_table :loans do |t|
      t.decimal :value
      t.decimal :rate
      t.integer :number_installments
      t.decimal :value_installments
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
