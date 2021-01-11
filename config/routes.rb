Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'todos/index'
      post 'todos/create'
      get '/show/:id', to: 'todos#show'
      delete '/destroy/:id', to: 'todos#destroy'
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
