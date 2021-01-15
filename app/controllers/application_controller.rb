class ApplicationController < ActionController::Base

    def current_user
        user = User.find_by(id: session[:user_id])
        render json: user
    end

    def logged_in?
        isUserLoggedIn = !current_user.nil?
        render json: isUserLoggedIn
    end
end
