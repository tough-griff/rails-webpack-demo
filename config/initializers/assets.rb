# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are
# already added.
Rails.application.config.assets.precompile += [
  /.*\.bundle\.(css|js)$/,
]

# Compiles whitelisted files to both digest and non-digest assets, allowing the
# source map references in built files to work.
# see: https://github.com/alexspeller/non-stupid-digest-assets
NonStupidDigestAssets.whitelist += [
  /.*\.map$/,
]
