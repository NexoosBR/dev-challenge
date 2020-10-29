class CreateInstallments < ActiveRecord::Migration[6.0]
  def change
    create_table :installments do |t|
      t.integer :installment_index
      t.decimal :value
      t.date :expiration
      t.integer :status, null: false, default: 0
      t.references :proposal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
