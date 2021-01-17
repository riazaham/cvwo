Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }

  namespace :api do
    namespace :v1 do
      resources :categories do
        resources :todos
      end
    end
  end
  root 'home#index'
  get '/get_current_user', to: 'application#getCurrentUser'
  get '/is_user_signed_in', to: 'application#isUserSignedIn'
  get '/get_all_users', to: 'application#getAllUsers'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
