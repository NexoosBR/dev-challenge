class AddUserToCompany < ActiveRecord::Migration[6.0]
  def change
    add_reference :companies, :user, null: false, foreign_key: true
  end
end
