class AddPastimagesToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :pastimages, :text, array: true, default: []
  end
end
