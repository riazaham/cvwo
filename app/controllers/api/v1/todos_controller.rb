class Api::V1::TodosController < ApplicationController
  def index
    category = Category.find(params[:category_id])
    todos = category.todos.all.order(created_at: :desc)
    render json: todos
  end

  def create
    category = Category.find(params[:category_id])
    todo = category.todos.create!(todo_params)
    if todo
      render json: todo
    else
      render json: todo.errors
    end
  end

  def show
    category = Category.find(params[:category_id])
    todo = category.todos.find(params[:id])
    if todo
      render json: todo
    else
      render json: todo.errors
    end
  end

  def update
    category = Category.find(params[:category_id])
    todo = category.todos.find(params[:id])
    if todo.update(todo_params)
      render json: todo
    else
      render json: todo.errors
    end
  end

  def destroy
    category = Category.find(params[:category_id])
    todo = category.todos.find(params[:id])
    todo&.destroy
    render json: { message: 'Todo deleted!' }
  end

  private
  def todo_params
    params.permit(:name, :body, :deadline, :progress)
  end
end
