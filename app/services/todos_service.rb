class TodosService
  # Reorder the todos and assign new indices.
  def move(at, to)
    Todo.transaction do
      [].concat(Todo.where("index < ? AND index != ?", to, at).order(:index))
        .append(Todo.find_by(index: at))
        .concat(Todo.where("index >= ? AND index != ?", to, at).order(:index))
        .each_with_index { |todo, i| todo.update!(index: i + 1) }
    end
  end
end
