class CreateClients < ActiveRecord::Migration[6.1]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :cnpj, limit: 14, unique: true
      t.index :cnpj
      t.text :phones, array: true, default: []

      t.timestamps
    end
  end
end
