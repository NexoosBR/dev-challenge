class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :contact
      t.integer :contact_type
      t.references :contactable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
