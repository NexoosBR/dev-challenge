class AddDescriptionToSolicitation < ActiveRecord::Migration[6.0]
  def change
    add_column :solicitations, :description, :text
  end
end
