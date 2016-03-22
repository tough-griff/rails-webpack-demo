# == Route Map
#
#               Prefix Verb   URI Pattern                         Controller#Action
#       mark_all_todos PATCH  /api/todos/mark_all(.:format)       todos#mark_all
#                      PUT    /api/todos/mark_all(.:format)       todos#mark_all
# clear_complete_todos DELETE /api/todos/clear_complete(.:format) todos#clear_complete
#                todos GET    /api/todos(.:format)                todos#index
#                      POST   /api/todos(.:format)                todos#create
#                 todo PATCH  /api/todos/:id(.:format)            todos#update
#                      PUT    /api/todos/:id(.:format)            todos#update
#                      DELETE /api/todos/:id(.:format)            todos#destroy
#                 root GET    /                                   application#index
#                      GET    /*path(.:format)                    application#index
#

Rails.application.routes.draw do
  scope :api do
    resources :todos, only: %i(index create destroy update) do
      patch :mark_all, on: :collection
      put :mark_all, on: :collection
      delete :clear_complete, on: :collection
    end
  end

  root "application#index"
  get "/*path", to: "application#index"
end
