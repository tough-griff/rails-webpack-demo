module ApplicationHelper
  def meta_tags
    [
      tag(:meta, charset: "utf-8"),
      tag(:meta, name: "viewport", content: "width=device-width, initial-scale=1"),
      tag(:meta, name: "api-url", content: api_url),
      csrf_meta_tags,
    ].join("\n").html_safe
  end

  def title
    return app_name if Rails.env.production?

    "#{app_name} (#{Rails.env.capitalize})"
  end

  private

  def app_name
    Rails.application.class.parent_name
  end
end
