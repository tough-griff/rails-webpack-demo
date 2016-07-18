module ApplicationHelper
  def meta_tags
    [
      tag("meta", charset: "utf-8"),
      tag("meta", name: "viewport", content: "width=device-width, initial-scale=1"),
      csrf_meta_tags,
    ].join("\n").html_safe
  end
end
