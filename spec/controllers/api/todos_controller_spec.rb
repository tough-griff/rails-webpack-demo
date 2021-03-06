require "rails_helper"

RSpec.describe Api::TodosController, type: :controller do
  let(:json_response) { JSON(response.body) }

  # JSON Response Shapes
  let(:todo_shape) do
    hash_including("id", "index", "label", "createdAt", "updatedAt", "isComplete")
  end
  let(:todos_shape) { array_including(todo_shape) }
  let(:error_shape) { array_including(an_instance_of(String)) }

  describe "GET #index" do
    before do
      create_list(:todo, 3)
      get :index
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "renders the correct JSON response" do
      expect(json_response).to include("todos" => todos_shape)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "returns http success" do
        post :create, params: { todo: attributes_for(:todo) }
        expect(response).to have_http_status(:success)
      end

      it "renders the correct JSON response" do
        post :create, params: { todo: attributes_for(:todo) }
        expect(json_response).to include("todo" => todo_shape)
      end

      it "creates a new todo" do
        expect do
          post :create, params: { todo: attributes_for(:todo) }
        end.to change(Todo, :count).by(1)
      end
    end

    context "with invalid params" do
      it "returns http error" do
        post :create, params: { todo: attributes_for(:todo, :invalid) }
        expect(response).to have_http_status(422)
      end

      it "renders the correct JSON response" do
        post :create, params: { todo: attributes_for(:todo, :invalid) }
        expect(json_response).to include(
          "meta" => { "error" => error_shape },
          "todo" => todo_shape,
        )
      end

      it "does not create a new todo" do
        expect do
          post :create, params: { todo: attributes_for(:todo, :invalid) }
        end.not_to change(Todo, :count)
      end
    end
  end

  describe "GET #show" do
    let!(:todo) { create(:todo) }

    before { get :show, params: { id: todo.id } }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "renders the correct JSON response" do
      expect(json_response).to include("todo" => todo_shape)
    end
  end

  describe "PATCH #update" do
    let!(:todo) { create(:todo, label: "Old label", complete: false) }

    context "with valid params" do
      it "returns http success" do
        patch :update, params: { id: todo.id, todo: attributes_for(:todo, label: "New label") }
        expect(response).to have_http_status(:success)
      end

      it "renders the correct JSON response" do
        patch :update, params: { id: todo.id, todo: attributes_for(:todo, label: "New label") }
        expect(json_response).to include("todo" => todo_shape)
      end

      it "updates the todo's label" do
        expect do
          patch :update, params: { id: todo.id, todo: attributes_for(:todo, label: "New label") }
          todo.reload
        end.to change(todo, :label).to("New label")
      end

      it "updates the todo's completed status" do
        expect do
          patch :update, params: { id: todo.id, todo: attributes_for(:todo, complete: true) }
          todo.reload
        end.to change(todo, :complete).to(true)
      end
    end

    context "with invalid params" do
      it "returns http error" do
        patch :update, params: { id: todo.id, todo: attributes_for(:todo, :invalid) }
        expect(response).to have_http_status(422)
      end

      it "renders the correct JSON response" do
        patch :update, params: { id: todo.id, todo: attributes_for(:todo, :invalid) }
        expect(json_response).to include(
          "meta" => { "error" => error_shape },
          "todo" => todo_shape,
        )
      end

      it "updates the todo" do
        expect do
          patch :update, params: { id: todo.id, todo: attributes_for(:todo, :invalid) }
        end.not_to change(todo, :label)
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:todo) { create(:todo) }

    context "on success" do
      it "returns http success" do
        delete :destroy, params: { id: todo.id }
        expect(response).to have_http_status(:success)
      end

      it "renders the correct JSON response" do
        delete :destroy, params: { id: todo.id }
        expect(json_response).to include("todo" => todo_shape)
      end

      it "deletes the todo" do
        expect do
          delete :destroy, params: { id: todo.id }
        end.to change(Todo, :count).by(-1)
      end
    end

    context "on failure" do
      before do
        allow(Todo).to receive(:find).with(todo.id.to_s).and_return(todo)
        allow(todo).to receive(:destroy).and_return(false)
      end

      it "returns http error" do
        delete :destroy, params: { id: todo.id }
        expect(response).to have_http_status(500)
      end

      it "renders the correct JSON response" do
        delete :destroy, params: { id: todo.id }
        expect(json_response).to include(
          "meta" => { "error" => error_shape },
          "todo" => todo_shape,
        )
      end

      it "does not delete the todo" do
        expect do
          delete :destroy, params: { id: todo.id }
        end.not_to change(Todo, :count)
      end
    end
  end

  describe "PATCH #mark_all" do
    let!(:todos) { create_list(:todo, 3, complete: false) }

    before { patch :mark_all, params: { complete: true } }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "renders the correct JSON response" do
      expect(json_response).to include("todos" => todos_shape)
    end

    it "marks all todos as completed" do
      todos.each { |todo| expect(todo.reload.complete).to be(true) }
    end
  end

  describe "PATCH #move" do
    let!(:todos) { create_list(:todo, 2) }
    let(:todos_service) { double(:todos_service) }

    before do
      subject.todos_service = todos_service
      allow(todos_service).to receive(:move).with("2", "1")
    end

    it "returns http success" do
      patch :move, params: { at: 2, to: 1 }
      expect(response).to have_http_status(:success)
    end

    it "renders the correct JSON response" do
      patch :move, params: { at: 2, to: 1 }
      expect(json_response).to include("todos" => todos_shape)
    end

    it "delegates to the appropriate service" do
      expect(todos_service).to receive(:move).with("2", "1")
      patch :move, params: { at: 2, to: 1 }
    end
  end

  describe "DELETE #clear_complete" do
    let!(:complete_todos) { create_list(:todo, 2, complete: true) }
    let!(:incomplete_todo) { create(:todo, complete: false) }

    it "returns http success" do
      delete :clear_complete
      expect(response).to have_http_status(:success)
    end

    it "renders the correct JSON response" do
      delete :clear_complete
      expect(json_response).to include("todos" => todos_shape)
    end

    it "deletes all completed todos" do
      expect do
        delete :clear_complete
      end.to change(Todo, :count).by(-2)
    end
  end
end
