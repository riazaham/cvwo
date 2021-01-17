class SessionsController < ApplicationController
    def create
        user = User.find_by_email(user_params[:email])
        return invalid_login_attempt unless user

        if user.valid_password?(user_params[:password])
            sign_in :user, user
            render json: user
        else
            invalid_login_attempt
        end
    end
    
    def destroy
        user = User.find_by_email(user_params[:email])
        sign_out(user)
        render :json=> {:success=>true}
    end
    
    
    private
    
    def invalid_login_attempt
        warden.custom_failure!
        render json: {error: 'invalid login attempt'}
    end

    def user_params
        params.permit(:username, :email, :password)
    end
end
