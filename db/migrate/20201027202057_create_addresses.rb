class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :address
      t.string :city
      t.string :state
      t.string :country
      t.string :zipcode
      t.references :addressable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
