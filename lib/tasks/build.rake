unless Rails.env.production?
  desc "Compile javascripts assets"
  task :build do
    system! "npm run build"
    Rake::Task["assets:precompile"].invoke
  end
end
