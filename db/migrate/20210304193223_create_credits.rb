class CreateCredits < ActiveRecord::Migration[6.1]
  def change
    create_table :credits do |t|
      t.integer :amount
      t.belongs_to :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
