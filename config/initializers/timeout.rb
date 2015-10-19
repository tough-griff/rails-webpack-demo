# Be sure to restart your server when you modify this file.

Rack::Timeout.timeout = (ENV["RACK_TIMEOUT"] || 10).to_i
