require "rails_helper"

RSpec.describe ApplicationController do
  describe "GET 'index'" do
    before { get :index }

    specify { expect(response).to render_template(:index) }
  end
end
