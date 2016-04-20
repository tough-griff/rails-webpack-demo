unless Rails.env.production?
  desc "Compile javascripts assets"
  task :build do
    Rails.env = "production"
    system! "npm run build"
    Rake::Task["assets:precompile"].invoke
    system! "rm -v public/assets/*-*.map"
  end
end
