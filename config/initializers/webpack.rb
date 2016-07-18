# Be sure to restart your server when you modify this file.

Rails.application.configure do
  config.webpack.host_name = ENV["APP_HOST"] || "localhost"
  config.webpack.hot_loading_enabled = true
  config.webpack.node_port = ENV["NODE_PORT"] || 5050
  config.webpack.simulate_production = ENV["SIMULATE_PROD"].present?
  config.webpack.suffix = "bundle"
end
