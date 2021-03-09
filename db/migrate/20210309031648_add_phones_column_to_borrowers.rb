class AddPhonesColumnToBorrowers < ActiveRecord::Migration[5.2]
  def change
    add_column :borrowers, :company_phone, :string, {null: false}
    add_column :borrowers, :owner_phone, :string, {null: false}

    add_index :borrowers, :company_number
  end
end
