class CreateBorrowers < ActiveRecord::Migration[5.2]
  def change
    create_table :borrowers do |t|
      t.string :company_name, null: false
      t.string :company_number, null: false

      t.timestamps
    end
  end
end
