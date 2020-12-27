class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :body
      t.string :deadline
      t.string :progress

      t.timestamps
    end
  end
end
