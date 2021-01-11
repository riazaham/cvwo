class Api::V1::TodosController < ApplicationController
  def index
    todos = Todo.all.order(created_at: :desc)
    render json: todos
  end

  def create
    todo = Todo.create!(todo_params)
    if todo
      render json: todo
    else
      render json: todo.errors
    end
  end

  def show
    todo = Todo.find(params[:id])
    if todo
      render json: todo
    else
      render json: todo.errors
    end
  end

  def destroy
    todo&.destroy
    render json: { message: 'Todo deleted!' }
  end

  private
  def todo_params
    params.permit(:name, :body, :deadline, :progress)
  end
end