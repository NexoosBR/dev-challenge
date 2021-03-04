class CreateTelephones < ActiveRecord::Migration[5.2]
  def change
    create_table :telephones do |t|
      t.string :area_code, null: false
      t.integer :phone_type, default: 0
      t.string :phone_number, null: false
      t.references :loan_applicant, foreign_key: true

      t.index :phone_number

      t.timestamps
    end
  end
end
