class CreateInstallments < ActiveRecord::Migration[6.1]
  def change
    create_table :installments do |t|
      t.integer :parcel
      t.integer :amount
      t.integer :status, default: 0
      t.date :due_date
      t.belongs_to :credit, null: false, foreign_key: true

      t.timestamps
    end
  end
end
