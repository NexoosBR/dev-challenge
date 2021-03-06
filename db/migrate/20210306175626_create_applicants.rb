class CreateApplicants < ActiveRecord::Migration[6.0]
  def change
    create_table :applicants do |t|
      t.string :company_name
      t.string :cnpj

      t.timestamps
    end
  end
end
