class TodosController < ApplicationController
  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    @todo = Todo.create(create_params)

    if @todo.persisted?
      render json: @todo
    else
      render_errors_for(@todo)
    end
  end

  def destroy
    @todo = Todo.find(params.require(:id))
    @todo.destroy

    if @todo.destroyed?
      render json: @todo
    else
      render_errors_for(@todo)
    end
  end

  private

  def create_params
    params.require(:todo).permit(:label)
  end

  def render_errors_for(object)
    render json: { error: object.errors.full_messages }, status: :error
  end
end
