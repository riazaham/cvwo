class UsersController < ApplicationController

  def create
    user = User.create(user_params)
    session[:user_id] = user.id
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  private
    def user_params
      params.permit(:username, :password)
    end
end
