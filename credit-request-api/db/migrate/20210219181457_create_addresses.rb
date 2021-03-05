class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.references :client, foreign_key: true, null: true
      t.string :value

      t.timestamps
    end
  end
end
