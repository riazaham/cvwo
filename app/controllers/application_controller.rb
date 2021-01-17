class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    before_action :configure_permitted_parameters, if: :devise_controller?

    def getCurrentUser
        render json: current_user
    end

    def getAllUsers
        users = User.all.order(created_at: :desc)
        render json: users
    end

    def isUserSignedIn
        if (user_signed_in?)
            render json: {message: 'user successfully authenticated'}
        else
            render json: {message: 'user authentication failed'}
        end
    end

    protected
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    end
end
