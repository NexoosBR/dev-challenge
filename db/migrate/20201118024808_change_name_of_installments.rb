class ChangeNameOfInstallments < ActiveRecord::Migration[6.0]
  def change
    rename_column :solicitations, :installments, :installments_number
  end
end
