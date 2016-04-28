module ApplicationHelper
  def meta_tags
    [
      tag("meta", charset: "utf-8"),
      tag("meta", name: "viewport", content: "width=device-width, initial-scale=1"),
      csrf_meta_tags,
    ].join("\n").html_safe
  end

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
