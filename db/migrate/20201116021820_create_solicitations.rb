class CreateSolicitations < ActiveRecord::Migration[6.0]
  def change
    create_table :solicitations do |t|
      t.string :amount
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
