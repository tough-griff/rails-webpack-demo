unless Rails.env.production?
  desc "Cleans up the working directory"
  task clean: %i(assets:clobber log:clear tmp:clear) do
    system! "npm run clean"
    system! "rm -rfv coverage"
    system! "git gc"
  end
end
