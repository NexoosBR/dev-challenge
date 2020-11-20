class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.references :company, null: false, foreign_key: true
      t.string :street
      t.integer :number

      t.timestamps
    end
  end
end
