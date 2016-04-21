desc "Compile javascripts assets"
task :build do
  abort("Rake must execute `build` in a production environment") unless Rails.env.production?

  system! "npm run build"
  Rake::Task["assets:precompile"].invoke
  system! "rm -v public/assets/*-*.map"
end
