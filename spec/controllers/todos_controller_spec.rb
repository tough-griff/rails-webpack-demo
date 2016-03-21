require "rails_helper"

RSpec.describe TodosController, type: :controller do
  let(:json_response) { JSON(response.body) }

  describe "GET #index" do
    before do
      create_list(:todo, 3)
      get :index
    end

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "assigns the correct todos" do
      expect(assigns(:todos)).to eq(Todo.first(3))
    end

    it "renders the correct JSON response" do
      expect(json_response).to include("todos")
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "returns http success" do
        post :create, todo: attributes_for(:todo)
        expect(response).to have_http_status(:success)
      end

      it "renders the correct JSON response" do
        post :create, todo: attributes_for(:todo)
        expect(json_response).to include("todo")
      end

      it "creates a new todo" do
        expect do
          post :create, todo: attributes_for(:todo)
        end.to change(Todo, :count).by(1)
      end
    end

    context "with invalid params" do
      it "returns http error" do
        post :create, todo: attributes_for(:todo, :invalid)
        expect(response).to have_http_status(422)
      end

      it "renders the correct JSON response" do
        post :create, todo: attributes_for(:todo, :invalid)
        expect(json_response).to include("error")
      end

      it "does not create a new todo" do
        expect do
          post :create, todo: attributes_for(:todo, :invalid)
        end.not_to change(Todo, :count)
      end
    end
  end

  # TODO: test failure?
  describe "DELETE #destroy" do
    let!(:todo) { create(:todo) }

    it "returns http success" do
      delete :destroy, id: todo.id
      expect(response).to have_http_status(:success)
    end

    it "renders the correct JSON response" do
      delete :destroy, id: todo.id
      expect(json_response).to include("todo")
    end

    it "deletes the todo" do
      expect do
        delete :destroy, id: todo.id
      end.to change(Todo, :count).by(-1)
    end
  end

  describe "PATCH #update" do
    let!(:todo) { create(:todo) }

    context "with valid params" do
      it "returns http success" do
        patch :update, id: todo.id, todo: attributes_for(:todo, label: "New label")
        expect(response).to have_http_status(:success)
      end

      it "renders the correct JSON response" do
        patch :update, id: todo.id, todo: attributes_for(:todo, label: "New label")
        expect(json_response).to include("todo")
      end

      it "updates the todo" do
        expect do
          patch :update, id: todo.id, todo: attributes_for(:todo, label: "New label")
          todo.reload
        end.to change(todo, :label).to("New label")
      end
    end

    context "with invalid params" do
      it "returns http error" do
        patch :update, id: todo.id, todo: attributes_for(:todo, :invalid)
        expect(response).to have_http_status(422)
      end

      it "renders the correct JSON response" do
        patch :update, id: todo.id, todo: attributes_for(:todo, :invalid)
        expect(json_response).to include("error")
      end

      it "updates the todo" do
        expect do
          patch :update, id: todo.id, todo: attributes_for(:todo, :invalid)
        end.not_to change(todo, :label)
      end
    end
  end
end
