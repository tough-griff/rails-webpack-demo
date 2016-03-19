class TodosController < ApplicationController
  def index
    @todos = Todo.all
    render json: { todos: @todos }
  end
end
