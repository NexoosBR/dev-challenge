class CreateLoanRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :loan_requests do |t|
      t.decimal :value, precision: 8, scale: 2
      t.integer :applicant_id

      t.timestamps
    end
  end
end
