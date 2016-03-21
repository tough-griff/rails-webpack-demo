# == Route Map
#
#         Prefix Verb   URI Pattern                   Controller#Action
# mark_all_todos PATCH  /api/todos/mark_all(.:format) todos#mark_all
#          todos GET    /api/todos(.:format)          todos#index
#                POST   /api/todos(.:format)          todos#create
#           todo PATCH  /api/todos/:id(.:format)      todos#update
#                PUT    /api/todos/:id(.:format)      todos#update
#                DELETE /api/todos/:id(.:format)      todos#destroy
#           root GET    /                             application#index
#                GET    /*path(.:format)              application#index
#

Rails.application.routes.draw do
  scope :api do
    resources :todos, only: %i(index create destroy update) do
      patch :mark_all, on: :collection
    end
  end

  root "application#index"
  get "/*path", to: "application#index"
end
