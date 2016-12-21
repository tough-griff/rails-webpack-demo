unless Rails.env.production?
  # Add `npm test` to the `rake spec` command.
  Rake::Task[:spec].enhance do
    if ENV["COVERAGE"]
      system! "npm run test:cov"
    else
      system! "npm run test"
    end
  end
end
