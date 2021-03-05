class CreatePhones < ActiveRecord::Migration[5.2]
  def change
    create_table :phones do |t|
      t.string :area_code, null: false
      t.integer :phone_type, default: 0
      t.string :phone_number, null: false
      t.references :borrower, foreign_key: true

      t.index :phone_number

      t.timestamps
    end
  end
end
