class RemovePhones < ActiveRecord::Migration[5.2]
  def change
    drop_table :phones, if_exists: true
  end
end
