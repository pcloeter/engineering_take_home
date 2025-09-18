class CreateCustomFields < ActiveRecord::Migration[7.2]
  def change
    create_table :custom_fields do |t|
      t.references :client, null: false, foreign_key: true
      t.string :name
      t.string :field_type
      t.jsonb :validations

      t.timestamps
      t.index [:client_id, :name], unique: true
    end
  end
end
