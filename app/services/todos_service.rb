class TodosService
  # Reorder the todos and assign new indices.
  def move(at, to)
    Todo.transaction do
      todos = []
      todos += Todo.where("index < ? AND index != ?", to, at).order(:index)
      todos << Todo.find_by(index: at)
      todos += Todo.where("index >= ? AND index != ?", to, at).order(:index)

      todos.each_with_index { |todo, i| todo.update!(index: i + 1) }
    end
  end
end
