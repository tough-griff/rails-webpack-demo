require "haml_lint/rake_task"
require "rubocop/rake_task"
require "scss_lint/rake_task"

namespace :lint do
  HamlLint::RakeTask.new do |t|
    t.config = ".haml-lint.yml"
    t.files = ["app/views"]
  end

  RuboCop::RakeTask.new(:rubocop)

  SCSSLint::RakeTask.new do |t|
    t.config = ".scss-lint.yml"
    t.files = ["app/assets/stylesheets"]
  end

  task all: %i(haml_lint rubocop scss_lint) do
    system! "npm run lint"
  end
end

desc "Runs all linters across the repository"
task lint: "lint:all"
