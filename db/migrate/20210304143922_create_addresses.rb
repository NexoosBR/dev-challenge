class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :address, null: false
      t.string :neighborhood, null: false
      t.string :city, null: false
      t.integer :fed_unit, default: 0
      t.string :zipcode, null: false
      t.references :loan_applicant, foreign_key: true

      t.timestamps
    end
  end
end
