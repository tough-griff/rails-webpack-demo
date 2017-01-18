module ApplicationHelper
  # Include a list of webpack assets.
  #
  # @param [Array<String>] assets any number of asset names to include
  # @return [ActiveSupport::SafeBuffer] the HTML safe list of tags
  def include_webpack_assets(*assets)
    assets.each_with_object([]) do |asset, tags|
      name = "#{asset}.bundle"
      tags << javascript_include_tag(name)
      tags << stylesheet_link_tag(name) if compiled.include?("#{name}.css")
    end.join("\n").html_safe
  end

  def meta_tags
    [
      tag(:meta, charset: "utf-8"),
      tag(:meta, name: "viewport", content: "width=device-width, initial-scale=1"),
      tag(:meta, name: "api-url", content: api_url),
      csrf_meta_tags,
    ].join("\n").html_safe
  end

  def title
    return app_name if production?

    "#{app_name} (#{Rails.env.capitalize})"
  end

  private

  def app_name
    Rails.application.class.parent_name
  end

  # Returns a list of compiled assets. We can safely ignore compilation
  # unless in a production-like environment.
  def compiled
    return Rails.application.assets_manifest.assets.keys if production?

    []
  end

  # Determine whether we are in production or simulating a production-like
  # environment.
  def production?
    Rails.env.production? || ENV["SIMULATE_PROD"]
  end
end
