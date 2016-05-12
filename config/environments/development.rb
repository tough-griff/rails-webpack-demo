Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Fallback to assets pipeline if a precompiled asset is missed.
  config.assets.compile = true

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = true

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = ENV["HTTPS"].present?

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  # Raises error for missing translations.
  config.action_view.raise_on_missing_translations = true

  # Allow rake notes to pick up annotations in scss and jsx files.
  config.annotations.register_extensions "scss", "jsx" do |annotation|
    %r{\/\/\s*(#{annotation}):?\s*(.*)$}
  end

  # ActionMailer & Mailcatcher
  config.action_mailer.default_url_options = { host: "#{ENV['APP_HOST'] || 'lvh.me'}:#{ENV['PORT'] || 5000}" }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = { address: "localhost", port: ENV["MAILCATCHER_PORT"] || 1025 }
  config.action_mailer.raise_delivery_errors = true

  if ENV["SIMULATE_PROD"].present?
    puts "Simulating production."
    # In a production-like environment, pull assets straight from public/assets.
    config.assets.compile = false
    config.assets.debug = false
    config.serve_static_files = true
  else
    # Request javascript assets from the webpack dev server.
    config.action_controller.asset_host = proc do |source|
      "//#{ENV['APP_HOST'] || 'lvh.me'}:#{ENV['NODE_PORT'] || 5050}/assets" if source.ends_with?("bundle.js")
    end
  end
end
