require "rails_helper"

RSpec.describe ApiController, type: :controller do
  let(:json_response) { JSON(response.body) }

  describe "GET #index" do
    before { get :index }

    specify { expect(response).to have_http_status(:success) }
    specify { expect(json_response).to be_empty }
  end
end
