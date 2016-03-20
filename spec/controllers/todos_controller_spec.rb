require "rails_helper"

RSpec.describe TodosController, type: :controller do
  let(:json_response) { JSON(response.body) }

  describe "GET #index" do
    before do
      create_list(:todo, 3)
      get :index
    end

    specify { expect(response).to have_http_status(:success) }
    specify { expect(assigns(:todos)).to eq(Todo.first(3)) }
    specify { expect(json_response).to include("todos") }
  end

  describe "POST #create" do
    context "with valid params" do
      before do
        post :create, todo: attributes_for(:todo)
      end

      specify { expect(response).to have_http_status(:success) }
      specify { expect(assigns(:todo)).to be_a(Todo) }
      specify { expect(json_response).to include("todo") }
    end

    context "with invalid params" do
      before do
        post :create, todo: attributes_for(:todo, :invalid)
      end

      specify { expect(response).to have_http_status(:success) }
      specify { expect(json_response).to include("error") }
    end
  end
end
