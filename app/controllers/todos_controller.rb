class TodosController < ApplicationController
  before_action :find_todo, only: %i(destroy update)

  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    @todo = Todo.create(todo_params)

    if @todo.persisted?
      render_todo
    else
      render_todo_errors
    end
  end

  def destroy
    if @todo.destroy
      render_todo
    else
      render json: { error: ["Unable to destroy todo with ID #{todo}"] }, status: 400
    end
  end

  def update
    if @todo.update(todo_params)
      render_todo
    else
      render_todo_errors
    end
  end

  private

  def find_todo
    @todo = Todo.find(params.require(:id))
  end

  def render_todo
    render json: @todo
  end

  def render_todo_errors
    render json: { error: @todo.errors.full_messages }, status: 422
  end

  def todo_params
    params.require(:todo).permit(:label)
  end
end
