class CreateInstallments < ActiveRecord::Migration[5.2]
  def change
    create_table :installments do |t|
      t.decimal :installment_value, null: false
      t.datetime :due_at, null: false
      t.references :loan_application, foreign_key: true

      t.timestamps
    end
  end
end
