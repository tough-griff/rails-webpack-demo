# == Route Map
#
# Prefix Verb URI Pattern      Controller#Action
#   root GET  /                application#index
#        GET  /*path(.:format) application#index
#

Rails.application.routes.draw do
  root "application#index"
  get "/*path", to: "application#index"
end
