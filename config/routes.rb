Rails.application.routes.draw do
  get 'currentUser', to: 'application#current_user'
  get 'userLoggedIn', to: 'application#logged_in?'


  resources :users
  resources :sessions

  namespace :api do
    namespace :v1 do
      resources :categories do
        resources :todos
      end
    end
  end
  root 'home#index'
  get '*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
