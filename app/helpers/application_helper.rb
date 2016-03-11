module ApplicationHelper
  # Returns the appropriate style or script tag for a given asset. Javascript
  # style bundles like `app.style.bundle.js` give us hot module replacement for
  # CSS.
  def style_tag(asset)
    return stylesheet_link_tag asset, media: "all" if production?

    javascript_include_tag asset
  end

  private

  # Determine whether we are in production or simulating a production-like
  # environment.
  def production?
    Rails.env.production? || ENV["SIMULATE_PROD"]
  end
end
