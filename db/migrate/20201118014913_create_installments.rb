class CreateInstallments < ActiveRecord::Migration[6.0]
  def change
    create_table :installments do |t|
      t.float :amount
      t.date :expiration
      t.integer :status
      t.references :solicitation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
