class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string  :label,    default: "",    null: false
      t.boolean :complete, default: false, null: false
      t.integer :index,    default: 0,     null: false

      t.timestamps null: false
    end
  end
end
