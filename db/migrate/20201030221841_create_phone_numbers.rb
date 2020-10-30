class CreatePhoneNumbers < ActiveRecord::Migration[6.0]
  def change
    create_table :phone_numbers do |t|
      t.string :number
      t.references :company, foreign_key: true

      t.timestamps
    end
  end
end
