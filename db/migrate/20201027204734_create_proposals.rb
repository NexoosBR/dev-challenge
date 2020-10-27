class CreateProposals < ActiveRecord::Migration[6.0]
  def change
    create_table :proposals do |t|
      t.decimal :value
      t.integer :installments
      t.decimal :tax
      t.date :expiration
      t.references :company_profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
