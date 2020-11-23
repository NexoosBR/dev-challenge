class AddInstallmentsToSolicitation < ActiveRecord::Migration[6.0]
  def change
    add_column :solicitations, :installments, :integer
  end
end
