class RegistrationsController < ApplicationController
    def create
        user = User.new(user_params)
        if user.save
          render json: user
        else
          warden.custom_failure!
          render json: { error: 'signup error' }
        end
    end
    
    def update
        user = User.find_by_email(user_params[:email])
        if user.update_attributes(user_params)
            render json: user
        else
            warden.custom_failure!
            render json: user.errors
        end
    end
    
    def destroy
        user = User.find_by_email(user_params[:email])
        if user.destroy
            render json: { success: 'user was successfully deleted' }
        else
            render json: { error: 'user could not be deleted' }
        end
    end
    
    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end

