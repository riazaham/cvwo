class Api::V1::CategoriesController < ApplicationController
  def index
    user = User.find_by(id: session[:user_id])
    categories = user.categories.all.order(created_at: :desc)
    render json: categories
  end

  def create
    user = User.find_by(id: session[:user_id])
    category = user.category.create!(category_params)
    if category
      render json: category
    else
      render json: category.errors
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    category = user.category.find(params[:id])
    if category
      render json: category
    else
      render json: category.errors
    end
  end

  def update
    user = User.find_by(id: session[:user_id])
    category = user.category.find(params[:id])
    if category.update(category_params)
      render json: category
    else
      render json: category.errors
    end
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    category = user.category.find(params[:id])
    category&.destroy
    render json: { message: 'Category deleted!' }
  end

  private
  def category_params
    params.permit(:name, :todo_count)
  end
end
