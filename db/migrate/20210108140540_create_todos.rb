class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.text :body
      t.string :deadline
      t.integer :progress

      t.timestamps
    end
  end
end
