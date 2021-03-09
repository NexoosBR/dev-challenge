class AddKindColumnToAddresses < ActiveRecord::Migration[5.2]
  def change
    add_column :addresses, :kind, :integer, { default: 0 }
  end
end
