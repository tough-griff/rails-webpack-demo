# Be sure to restart your server when you modify this file.

Rack::Timeout.service_timeout = (ENV["SERVICE_TIMEOUT"] || 10).to_i
Rack::Timeout.wait_timeout = (ENV["WAIT_TIMEOUT"] || 30).to_i
