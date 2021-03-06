class UsersController < ApplicationController

  def create
    user = User.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  private
    def user_params
      params.permit(:username, :email, :password)
    end
end
