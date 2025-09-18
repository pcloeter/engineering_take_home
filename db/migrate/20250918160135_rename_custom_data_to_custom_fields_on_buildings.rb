class RenameCustomDataToCustomFieldsOnBuildings < ActiveRecord::Migration[7.2]
  def change
    rename_column :buildings, :custom_data, :custom_fields
  end
end
