class CreateCompanyProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :company_profiles do |t|
      t.string :name
      t.string :document
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
