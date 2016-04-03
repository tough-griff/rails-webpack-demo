unless Rails.env.production?
  desc "Lint and test all code"
  task check: %i(lint spec)
end
