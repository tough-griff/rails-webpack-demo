source "https://rubygems.org"
ruby "2.3.1"

gem "rails", "5.0.0"

gem "active_model_serializers", "~> 0.10.2"
gem "haml-rails",               "~> 0.9.0"
gem "non-stupid-digest-assets", "~> 1.0.8"
gem "passenger",                "~> 5.0.30"
gem "pg",                       "~> 0.19.0"
gem "rack-timeout",             "~> 0.4.2"
gem "system-bang",              "~> 1.0.0"
gem "webpack-rails",            "~> 1.0.0.rc", path: "vendor/gems/webpack-rails"

group :development do
  gem "annotate"
  gem "foreman", require: false
  gem "haml_lint", require: false
  gem "mailcatcher", require: false
  gem "rubocop", require: false
  gem "scss_lint", require: false
  gem "spring-commands-rspec"
  gem "spring"
  gem "travis", require: false
end

group :development, :test do
  gem "awesome_print"
  gem "pry-byebug"
  gem "pry-rails"
  gem "rspec-rails"
  gem "simplecov", require: false
end

group :test do
  gem "database_cleaner", require: false
  gem "factory_girl_rails"
  gem "rails-controller-testing"
  gem "shoulda-matchers", require: false
end

group :production, :staging do
  gem "rails_12factor", "~> 0.0.3"
end
