class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.all.order(created_at: :desc)
    render json: categories
  end

  def create
    category = Category.create!(category_params)
    if todo
      render json: category
    else
      render json: category.errors
    end
  end

  def show
    cateogry = Cateogry.find(params[:id])
    if category
      render json: category
    else
      render json: category.errors
    end
  end

  def update
    cateogry = Cateogry.find(params[:id])
    if category.update(category_params)
      render json: category
    else
      render json: category.errors
    end
  end

  def destroy
    cateogry = Cateogry.find(params[:id])
    category&.destroy
    render json: { message: 'Category deleted!' }
  end

  private
  def category_params
    params.permit(:title, :todo_count)
  end
end
