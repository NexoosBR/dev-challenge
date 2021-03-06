class CreatePhones < ActiveRecord::Migration[6.0]
  def change
    create_table :phones do |t|
      t.string :number
      t.integer :applicant_id

      t.timestamps
    end
  end
end
