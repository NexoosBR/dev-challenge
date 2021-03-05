class CreatePhones < ActiveRecord::Migration[5.2]
  def change
    create_table :phones do |t|
      t.references :client, foreign_key: true, null: true
      t.string :value

      t.timestamps
    end
  end
end
