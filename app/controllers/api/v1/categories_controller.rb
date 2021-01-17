class Api::V1::CategoriesController < ApplicationController
  def index
    user = current_user
    categories = user.categories.all.order(created_at: :desc)
    render json: { user: user, categories: categories }
  end

  def create
    user = current_user
    category = user.categories.create!(category_params)
    if category
      render json: category
    else
      render json: category.errors
    end
  end

  def show
    user = current_user
    category = user.categories.find(params[:id])
    if category
      render json: category
    else
      render json: category.errors
    end
  end

  def update
    user = current_user
    category = user.categories.find(params[:id])
    if category.update(category_params)
      render json: category
    else
      render json: category.errors
    end
  end

  def destroy
    user = current_user
    category = user.categories.find(params[:id])
    category&.destroy
    render json: { message: 'Category deleted!' }
  end

  private
  def category_params
    params.permit(:name, :todo_count)
  end
end
