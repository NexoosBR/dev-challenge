class CreateCredits < ActiveRecord::Migration[5.2]
  def change
    create_table :credits do |t|
      t.references :client, foreign_key: true, null: true
      t.decimal :value, precision: 15, scale: 2
      t.decimal :remain, precision: 15, scale: 2

      t.timestamps
    end
  end
end
