# == Route Map
#
#               Prefix Verb   URI Pattern                         Controller#Action
#       mark_all_todos PATCH  /api/todos/mark_all(.:format)       api/todos#mark_all
#           move_todos PATCH  /api/todos/move(.:format)           api/todos#move
# clear_complete_todos DELETE /api/todos/clear_complete(.:format) api/todos#clear_complete
#                todos GET    /api/todos(.:format)                api/todos#index
#                      POST   /api/todos(.:format)                api/todos#create
#                 todo GET    /api/todos/:id(.:format)            api/todos#show
#                      PATCH  /api/todos/:id(.:format)            api/todos#update
#                      PUT    /api/todos/:id(.:format)            api/todos#update
#                      DELETE /api/todos/:id(.:format)            api/todos#destroy
#                 root GET    /                                   application#index
#                      GET    /*path(.:format)                    application#index
#

Rails.application.routes.draw do
  scope :api, module: :api do
    resources :todos, only: %i(index create show update destroy) do
      collection do
        patch :mark_all
        patch :move
        delete :clear_complete
      end
    end
  end

  root "application#index"
  get "/*path", to: "application#index"
end
