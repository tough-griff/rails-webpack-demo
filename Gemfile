source "https://rubygems.org"
ruby "2.2.3"

gem "rails", "4.2.4"

gem "passenger",    "~> 5.0.20"
gem "pg",           "~> 0.18.3"
gem "rack-timeout", "~> 0.3.2"
gem "sass-rails",   "~> 5.0.4"
gem "uglifier",     "~> 2.7.2"

group :development do
  gem "foreman", require: false
  gem "mailcatcher", require: false
  gem "rubocop"
  gem "scss_lint"
  gem "spring-commands-rspec"
  gem "spring"
end

group :development, :test do
  gem "awesome_print"
  gem "pry-rails"
  gem "pry-byebug"
  gem "rspec-rails"
end

group :test do
  gem "database_cleaner", require: false
  gem "shoulda-matchers", require: false
end

group :production, :staging do
  gem "rails_12factor", "~> 0.0.3"
end
