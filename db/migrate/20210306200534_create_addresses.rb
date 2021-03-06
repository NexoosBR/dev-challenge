class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :street
      t.string :number
      t.string :zipcode
      t.string :complement
      t.string :city
      t.string :state
      t.string :country

      t.integer :applicant_id

      t.timestamps
    end
  end
end
