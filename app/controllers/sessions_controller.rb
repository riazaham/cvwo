class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { message: "User authentication failed" }
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { message: "User logged out successfully" }
  end
end
