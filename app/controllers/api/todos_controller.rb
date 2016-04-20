class Api::TodosController < ApiController
  attr_writer :todos_service

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
      render_destroy_todo_errors
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
      Todo.find_each { |todo| todo.update!(complete: params.require(:complete)) }
    end

    @todos = Todo.order(:index)
    render json: @todos
  end

  def move
    todos_service.move(params.require(:at), params.require(:to))

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

  def render_destroy_todo_errors
    render json: { error: ["Unable to destroy todo with ID #{todo.id}: #{todo.label}"] }, status: 400
  end

  def todo_params
    params.require(:todo).permit(:label, :complete)
  end

  def todos_service
    @todos_service ||= TodosService.new
  end
end
