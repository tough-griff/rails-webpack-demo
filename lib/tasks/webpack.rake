require "system-bang"

namespace :webpack do
  desc "Compile javascripts assets"
  task :build do
    system! "npm run build"
    Rake::Task["assets:precompile"].invoke
    system! "cp -v app/assets/{javascripts,stylesheets}/*.map public/assets/"
    system! "npm run clean"
  end
end
