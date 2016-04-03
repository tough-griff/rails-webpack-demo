unless Rails.env.production?
  # Add `npm test` to the `rake spec` command.
  Rake::Task[:spec].enhance do
    system! "npm test -- --reporter=dot"
  end
end
