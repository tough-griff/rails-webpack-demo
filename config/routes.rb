# == Route Map
#
# Prefix Verb URI Pattern          Controller#Action
#  todos GET  /api/todos(.:format) todos#index
#        POST /api/todos(.:format) todos#create
#   root GET  /                    application#index
#        GET  /*path(.:format)     application#index
#

Rails.application.routes.draw do
  scope :api do
    resources :todos, only: %i(index create)
  end

  root "application#index"
  get "/*path", to: "application#index"
end
