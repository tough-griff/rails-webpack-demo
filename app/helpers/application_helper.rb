module ApplicationHelper
  def meta_tags
    [
      tag("meta", charset: "utf-8"),
      tag("meta", name: "viewport", content: "width=device-width, initial-scale=1"),
      csrf_meta_tags,
    ].join("\n").html_safe
  end

  def title
    return "RailsWebpackDemo" if Rails.env.production?

    "RailsWebpackDemo (#{Rails.env.capitalize})"
  end
end
