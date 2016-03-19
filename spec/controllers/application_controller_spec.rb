require "rails_helper"

RSpec.describe ApplicationController, type: :controller do
  describe "GET #index" do
    before { get :index }

    specify { expect(response).to have_http_status(:success) }
    specify { expect(response).to render_template(:index) }
  end
end
