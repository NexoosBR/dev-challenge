class ChangeAmountToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :solicitations, :amount, 'integer USING CAST(amount AS integer)'
  end
end
