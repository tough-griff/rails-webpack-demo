if Rails.env.development?
  puts "Seeding database..."

  Todo.create!([{
    label: "Be awesome",
    complete: true,
  }, {
    label: "Rule the web",
    complete: false,
  }])
else
  puts "Skipping seed data."
end
