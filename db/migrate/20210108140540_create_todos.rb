class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.text :body, null: false
      t.string :deadline
      t.string :progress

      t.timestamps
    end
  end
end
