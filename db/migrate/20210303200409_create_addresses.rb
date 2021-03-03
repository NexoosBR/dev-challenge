class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.string :cep, limit: 8
      t.string :street
      t.string :state, limit: 2
      t.string :city
      t.string :number
      t.string :complement
      t.belongs_to :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
