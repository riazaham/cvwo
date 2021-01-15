class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      sessions[:user_id] = user.id
      redirect_to '/categories'
    end
  end
end
