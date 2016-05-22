unless Rails.env.production?
  desc "Cleans up the working directory"
  task clean: %w(assets:clobber log:clear tmp:clear) do
    system! "npm run clean"
    system! "rm -rfv coverage"
    system! "git gc"
  end
end
