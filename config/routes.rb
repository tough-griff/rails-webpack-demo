# == Route Map
#
# Prefix Verb   URI Pattern              Controller#Action
#  todos GET    /api/todos(.:format)     todos#index
#        POST   /api/todos(.:format)     todos#create
#   todo PATCH  /api/todos/:id(.:format) todos#update
#        PUT    /api/todos/:id(.:format) todos#update
#        DELETE /api/todos/:id(.:format) todos#destroy
#   root GET    /                        application#index
#        GET    /*path(.:format)         application#index
#

Rails.application.routes.draw do
  scope :api do
    resources :todos, only: %i(index create destroy update)
  end

  root "application#index"
  get "/*path", to: "application#index"
end
