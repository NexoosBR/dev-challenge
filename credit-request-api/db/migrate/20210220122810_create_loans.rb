class CreateLoans < ActiveRecord::Migration[5.2]
  def change
    create_table :loans do |t|
      t.references :client, foreign_key: true, null: true
      t.references :credit, foreign_key: true, null: true

      t.integer :subdivision
      t.decimal :interest
      t.decimal :value, precision: 15, scale: 2
      t.decimal :total, precision: 15, scale: 2

      t.timestamps
    end
  end
end
