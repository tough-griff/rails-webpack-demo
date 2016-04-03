class TodosController < ApplicationController
  before_action :find_todo, only: %i(destroy update)

  def index
    @todos = Todo.order(:index)
    render json: @todos
  end

  def create
    @todo = Todo.create(todo_params)

    if @todo.persisted?
      render json: @todo
    else
      render_todo_errors
    end
  end

  def destroy
    if @todo.destroy
      render json: @todo
    else
      render json: { error: ["Unable to destroy todo with ID #{todo.id}: #{todo.label}"] }, status: 400
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render_todo_errors
    end
  end

  def mark_all
    Todo.transaction do
      Todo.find_each { |todo| todo.update(complete: params.require(:complete)) }
    end

    @todos = Todo.order(:index)
    render json: @todos
  end

  def move
    at = params.require(:at)
    to = params.require(:to)

    # Reorder the todos and assign new indices.
    Todo.transaction do
      Todo.where("index < ? AND index != ?", to, at)
        .append(Todo.find_by(index: at))
        .concat(Todo.where("index >= ? AND index != ?", to, at))
        .each_with_index { |todo, i| todo.update!(index: i + 1) }
    end

    @todos = Todo.order(:index)
    render json: @todos
  end

  def clear_complete
    Todo.transaction do
      @todos = Todo.destroy_all(complete: true)
    end

    render json: @todos
  end

  private

  def find_todo
    @todo = Todo.find(params.require(:id))
  end

  def render_todo_errors
    render json: { error: @todo.errors.full_messages }, status: 422
  end

  def todo_params
    params.require(:todo).permit(:label, :complete)
  end
end
