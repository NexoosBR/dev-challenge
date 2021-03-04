class CreateLoanApplications < ActiveRecord::Migration[5.2]
  def change
    create_table :loan_applications do |t|
      t.integer :number_installments, null:false, default: 1
      t.decimal :interest_rate, null: false
      t.integer :status, default: 0
      t.references :loan_applicant, foreign_key: true

      t.timestamps
    end
  end
end
