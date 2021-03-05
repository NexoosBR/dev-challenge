class CreateInstallments < ActiveRecord::Migration[5.2]
  def change
    create_table :installments do |t|
      t.references :loan, foreign_key: true, null: true

      t.date :payday
      t.decimal :value, precision: 15, scale: 2

      t.timestamps
    end
  end
end
